// draggableNode.js

const NODE_CHIP = {
  customInput:  'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-900/30',
  llm:          'bg-violet-500  hover:bg-violet-400  shadow-violet-900/30',
  customOutput: 'bg-fuchsia-500 hover:bg-fuchsia-400 shadow-fuchsia-900/30',
  text:         'bg-amber-500   hover:bg-amber-400   shadow-amber-900/30',
  math:         'bg-rose-500    hover:bg-rose-400    shadow-rose-900/30',
  api:          'bg-cyan-500    hover:bg-cyan-400    shadow-cyan-900/30',
  condition:    'bg-orange-500  hover:bg-orange-400  shadow-orange-900/30',
  delay:        'bg-slate-500   hover:bg-slate-400   shadow-slate-900/30',
  logger:       'bg-teal-500    hover:bg-teal-400    shadow-teal-900/30',
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const chipClass = NODE_CHIP[type] || 'bg-slate-500 hover:bg-slate-400';

  return (
    <div
      className="group"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ cursor: 'grab' }}
      draggable
    >
      <span
        className={`inline-flex h-9 min-w-[90px] items-center justify-center rounded-lg px-3 text-xs font-semibold text-white shadow-md transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg ${chipClass}`}
      >
        {label}
      </span>
    </div>
  );
};
  