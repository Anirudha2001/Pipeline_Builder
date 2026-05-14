import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">

        <header className="flex items-center justify-between rounded-xl border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-800/70 px-5 py-4 shadow-2xl">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              <span className="text-indigo-400">Pipeline</span> Builder
            </h1>
            <p className="mt-0.5 text-sm text-slate-400">Drag nodes, connect edges, submit to analyze.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
        </header>

        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />

      </div>
    </div>
  );
}

export default App;
