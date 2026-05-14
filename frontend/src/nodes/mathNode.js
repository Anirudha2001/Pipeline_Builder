import { NodeBase } from './baseNode';

export const MathNode = ({ id }) => {
  return (
    <NodeBase
      nodeId={id}
      title="Math"
      icon="±"
      accent="rose"
      inputs={[
        { id: `${id}-a`, style: { top: '35%' } },
        { id: `${id}-b`, style: { top: '65%' } },
      ]}
      outputs={[{ id: `${id}-result` }]}
    >
      <div className="grid grid-cols-2 gap-2">
        <input className="node-input" defaultValue="12" placeholder="Value" />
        <select className="node-input">
          <option>Add</option>
          <option>Subtract</option>
          <option>Multiply</option>
          <option>Divide</option>
        </select>
      </div>
      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <span>Input A</span>
        <span>Input B</span>
      </div>
    </NodeBase>
  );
};
