import { NodeBase } from './baseNode';

export const DelayNode = ({ id }) => {
  return (
    <NodeBase
      nodeId={id}
      title="Delay"
      icon="⏱"
      accent="slate"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="text-xs font-medium text-slate-600">
        Delay (ms)
        <input className="node-input mt-1" type="number" defaultValue={500} min={0} />
      </label>
    </NodeBase>
  );
};
