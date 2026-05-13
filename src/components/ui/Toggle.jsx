export default function Toggle({ enabled, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {label && (
        <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
      )}
      <div
        onClick={() => onChange(!enabled)}
        className="relative w-9 h-5 rounded-full transition-colors duration-200"
        style={{ background: enabled ? 'var(--primary)' : 'var(--border)' }}
      >
        <div
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm"
          style={{ transform: enabled ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </div>
    </label>
  );
}
