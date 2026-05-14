// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
  const clearPipeline = useStore((state) => state.clearPipeline);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/90 p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-200">Node Library</span>
        <button
          type="button"
          onClick={clearPipeline}
          className="rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-red-500/80 hover:text-red-400"
        >
          Clear Pipeline
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <DraggableNode type="customInput"  label="Input" />
        <DraggableNode type="llm"          label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text"         label="Text" />
        <DraggableNode type="math"         label="Math" />
        <DraggableNode type="api"          label="API Request" />
        <DraggableNode type="condition"    label="Condition" />
        <DraggableNode type="delay"        label="Delay" />
        <DraggableNode type="logger"       label="Logger" />
      </div>
    </div>
  );
};
