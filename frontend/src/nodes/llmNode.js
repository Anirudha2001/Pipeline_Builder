// llmNode.js

import { NodeBase } from './baseNode';

export const LLMNode = ({ id }) => {
  return (
    <NodeBase
      nodeId={id}
      title="LLM"
      icon="AI"
      accent="violet"
      inputs={[
        { id: `${id}-system`, style: { top: '40%' } },
        { id: `${id}-prompt`, style: { top: '68%' } },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div className="flex flex-col gap-1.5 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-violet-300" />
          System prompt
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-violet-300" />
          User prompt
        </div>
      </div>
      <div className="rounded-md border border-violet-100 bg-violet-50 p-2 text-xs text-violet-600">
        Generates AI response
      </div>
    </NodeBase>
  );
}
