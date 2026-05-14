// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch('/_/backend/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setResult(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 pb-2 pt-1">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="inline-flex h-11 min-w-[180px] items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing…
          </>
        ) : 'Submit Pipeline'}
      </button>

      {result && (
        <div className="flex overflow-hidden rounded-xl border border-slate-700 shadow-xl">
          <div className="flex flex-col items-center gap-0.5 bg-slate-800 px-8 py-3">
            <span className="text-2xl font-bold text-blue-400">{result.num_nodes}</span>
            <span className="text-xs text-slate-400">Nodes</span>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="flex flex-col items-center gap-0.5 bg-slate-800 px-8 py-3">
            <span className="text-2xl font-bold text-violet-400">{result.num_edges}</span>
            <span className="text-xs text-slate-400">Edges</span>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="flex flex-col items-center gap-0.5 bg-slate-800 px-8 py-3">
            <span className={`text-base font-bold ${result.is_dag ? 'text-emerald-400' : 'text-red-400'}`}>
              {result.is_dag ? '✓ Valid DAG' : '✗ Has Cycle'}
            </span>
            <span className="text-xs text-slate-400">Structure</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-800/60 bg-red-950/50 px-5 py-3 text-sm text-red-400 shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
