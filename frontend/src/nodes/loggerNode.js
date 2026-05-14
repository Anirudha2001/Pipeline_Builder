import { NodeBase } from './baseNode';

export const LoggerNode = ({ id }) => {
  return (
    <NodeBase
      nodeId={id}
      title="Logger"
      icon="Lo"
      accent="teal"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <select className="node-input">
        <option>Info</option>
        <option>Warn</option>
        <option>Error</option>
      </select>
      <span className="text-xs text-slate-400">Logs values for debugging.</span>
    </NodeBase>
  );
};
