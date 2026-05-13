export default function TabSelector({ tabs, active, onChange, className }) {
  return (
    <div
      className={`flex rounded-lg p-0.5 ${className || ''}`}
      style={{ background: 'var(--muted)' }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150"
            style={{
              background: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
