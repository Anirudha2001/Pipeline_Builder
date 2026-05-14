// inputNode.js

import { useState } from 'react';
import { NodeBase } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <NodeBase
      nodeId={id}
      title="Input"
      icon="IN"
      accent="emerald"
      outputs={[{ id: `${id}-value` }]}
    >
      <label className="text-xs font-medium text-slate-600">
        Name
        <input type="text" value={currName} onChange={handleNameChange} className="node-input mt-1" />
      </label>
      <label className="text-xs font-medium text-slate-600">
        Type
        <select value={inputType} onChange={handleTypeChange} className="node-input mt-1">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </NodeBase>
  );
}
