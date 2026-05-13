export default function Badge({ children, color, size = 'sm' }) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
      style={{
        background: color ? `${color}20` : 'var(--muted)',
        color: color || 'var(--foreground)',
      }}
    >
      {children}
    </span>
  );
}
