// textNode.js

import { useState, useMemo } from 'react';
import { NodeBase } from './baseNode';

const extractVariables = (text) => {
  const matches = [...text.matchAll(/{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g)];
  return [...new Set(matches.map((m) => m[1]))];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = useMemo(() => extractVariables(currText), [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const inputHandles = variables.map((name, idx) => ({
    id: `${id}-${name}`,
    style: { top: `${((idx + 1) * 100) / (variables.length + 1)}%` },
  }));

  const rows = Math.min(10, Math.max(3, currText.split('\n').length + Math.floor(currText.length / 42)));

  return (
    <NodeBase
      nodeId={id}
      title="Text"
      icon="Tx"
      accent="amber"
      className="min-w-[280px]"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="text-xs font-medium text-slate-600">
          Text:
          <textarea
            value={currText}
            onChange={handleTextChange}
            rows={rows}
            className="node-input mt-1 min-h-[72px] resize-none leading-relaxed transition-all"
          />
      </label>
      {variables.length > 0 && (
        <span className="rounded-md border border-amber-100 bg-amber-50 p-2 text-xs text-amber-700">
          Variables: {variables.join(', ')}
        </span>
      )}
    </NodeBase>
  );
}
