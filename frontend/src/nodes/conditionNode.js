import { NodeBase } from './baseNode';

export const ConditionNode = ({ id }) => {
  return (
    <NodeBase
      nodeId={id}
      title="Condition"
      icon="If"
      accent="orange"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-true`,  style: { top: '35%' } },
        { id: `${id}-false`, style: { top: '65%' } },
      ]}
    >
      <input className="node-input" defaultValue="value > 10" placeholder="Expression" />
      <div className="flex justify-end gap-4 text-xs">
        <span className="font-medium text-emerald-600">↑ True</span>
        <span className="font-medium text-red-500">↓ False</span>
      </div>
    </NodeBase>
  );
};
