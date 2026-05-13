export default function ProgressBar({ value, max = 100, color, label }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-xs font-medium w-14 text-right flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>
          {label}
        </span>
      )}
      <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--muted)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: color || 'var(--primary)',
          }}
        />
      </div>
      <span className="text-xs font-semibold w-10 text-right" style={{ color: 'var(--foreground)' }}>
        {value}
      </span>
    </div>
  );
}
