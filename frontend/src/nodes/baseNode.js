import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const ACCENTS = {
  emerald: { bar: 'bg-emerald-400', hdr: 'bg-emerald-50', ttl: 'text-emerald-800', badge: 'bg-emerald-500', hIn: '#10b981', hOut: '#34d399' },
  violet:  { bar: 'bg-violet-400',  hdr: 'bg-violet-50',  ttl: 'text-violet-800',  badge: 'bg-violet-500',  hIn: '#8b5cf6', hOut: '#a78bfa' },
  fuchsia: { bar: 'bg-fuchsia-400', hdr: 'bg-fuchsia-50', ttl: 'text-fuchsia-800', badge: 'bg-fuchsia-500', hIn: '#d946ef', hOut: '#e879f9' },
  amber:   { bar: 'bg-amber-400',   hdr: 'bg-amber-50',   ttl: 'text-amber-800',   badge: 'bg-amber-500',   hIn: '#f59e0b', hOut: '#fbbf24' },
  rose:    { bar: 'bg-rose-400',    hdr: 'bg-rose-50',    ttl: 'text-rose-800',    badge: 'bg-rose-500',    hIn: '#f43f5e', hOut: '#fb7185' },
  cyan:    { bar: 'bg-cyan-400',    hdr: 'bg-cyan-50',    ttl: 'text-cyan-800',    badge: 'bg-cyan-500',    hIn: '#06b6d4', hOut: '#22d3ee' },
  orange:  { bar: 'bg-orange-400',  hdr: 'bg-orange-50',  ttl: 'text-orange-800',  badge: 'bg-orange-500',  hIn: '#f97316', hOut: '#fb923c' },
  slate:   { bar: 'bg-slate-400',   hdr: 'bg-slate-50',   ttl: 'text-slate-700',   badge: 'bg-slate-500',   hIn: '#64748b', hOut: '#94a3b8' },
  teal:    { bar: 'bg-teal-400',    hdr: 'bg-teal-50',    ttl: 'text-teal-800',    badge: 'bg-teal-500',    hIn: '#14b8a6', hOut: '#2dd4bf' },
};

export const NodeBase = ({ nodeId, title, icon = '◈', accent = 'slate', inputs = [], outputs = [], children, className = '' }) => {
  const c = ACCENTS[accent] || ACCENTS.slate;
  const deleteNode = useStore((s) => s.deleteNode);

  return (
    <div className={`relative min-w-[240px] overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl ${className}`}>
      {/* Colored top accent bar */}
      <div className={`h-1 w-full ${c.bar}`} />

      {inputs.map((handle) => (
        <Handle
          key={`in-${handle.id}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ background: c.hIn, width: 12, height: 12, border: '2px solid white', ...handle.style }}
        />
      ))}
      {outputs.map((handle) => (
        <Handle
          key={`out-${handle.id}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{ background: c.hOut, width: 12, height: 12, border: '2px solid white', ...handle.style }}
        />
      ))}

      {/* Header */}
      <div className={`flex items-center gap-2 border-b border-slate-100 px-3 py-2 ${c.hdr}`}>
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[9px] font-bold text-white ${c.badge}`}>
          {icon}
        </span>
        <span className={`flex-1 text-xs font-semibold tracking-wide ${c.ttl}`}>{title}</span>
        {nodeId && (
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); deleteNode(nodeId); }}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors"
            title="Delete node"
          >
            ✕
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-3 text-xs text-slate-600">{children}</div>
    </div>
  );
};
