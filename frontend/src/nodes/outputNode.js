// outputNode.js

import { useState } from 'react';
import { NodeBase } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <NodeBase
      nodeId={id}
      title="Output"
      icon="OUT"
      accent="fuchsia"
      inputs={[{ id: `${id}-value` }]}
    >
      <label className="text-xs font-medium text-slate-600">
        Name
        <input type="text" value={currName} onChange={handleNameChange} className="node-input mt-1" />
      </label>
      <label className="text-xs font-medium text-slate-600">
        Type
        <select value={outputType} onChange={handleTypeChange} className="node-input mt-1">
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </NodeBase>
  );
}
