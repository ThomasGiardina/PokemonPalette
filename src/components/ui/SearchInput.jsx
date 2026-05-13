import { SearchIcon } from './Icons';

export default function SearchInput({ value, onChange, placeholder, onBlur, onKeyDown }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none" style={{ color: 'var(--muted-foreground)' }}>
        <SearchIcon />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search Pokémon..."}
        className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-colors"
        style={{
          background: 'var(--muted)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; onBlur?.(e); }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
