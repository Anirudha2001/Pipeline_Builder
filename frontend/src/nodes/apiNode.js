import { NodeBase } from './baseNode';

export const APINode = ({ id }) => {
  return (
    <NodeBase
      nodeId={id}
      title="API Request"
      icon="AP"
      accent="cyan"
      inputs={[{ id: `${id}-request` }]}
      outputs={[{ id: `${id}-response` }]}
    >
      <select className="node-input">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>
      <input className="node-input" defaultValue="https://api.example.com" placeholder="URL" />
    </NodeBase>
  );
};
