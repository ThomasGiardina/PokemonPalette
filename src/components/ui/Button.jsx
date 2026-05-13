export default function Button({ children, variant = 'primary', icon, onClick, className, size = 'md' }) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2',
  };

  const baseStyle = variant === 'primary'
    ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
    : variant === 'secondary'
    ? { background: 'var(--muted)', color: 'var(--foreground)' }
    : { background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)' };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 hover:opacity-90 active:scale-95 ${sizeClasses[size]} ${className || ''}`}
      style={baseStyle}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
