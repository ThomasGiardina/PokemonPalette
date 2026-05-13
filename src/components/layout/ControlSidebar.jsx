import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import SearchInput from '../ui/SearchInput';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { LockIcon, RandomIcon } from '../ui/Icons';

export default function ControlSidebar({ open, onToggle, onClose }) {
  const { t } = useTranslation();
  const {
    pokemon, loading,
    pokemonId, navigatePokemon,
    searchTerm, searchPokemon,
    colors, paletteLoading, toggleLock, updateColor,
    colorCount, setColorCount,
    getRandomPokemon, regenerate,
    shiny, setShiny,
    spriteSmall, suggestions,
  } = usePokemonContext();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputId, setInputId] = useState(String(pokemonId || ''));

  useEffect(() => {
    setInputId(String(pokemonId || ''));
  }, [pokemonId]);

  const handleSelect = (id) => {
    navigatePokemon(id);
    setShowSuggestions(false);
  };

  const name = pokemon?.name
    ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : '';

  const handlePrev = () => {
    const prev = Math.max(1, (pokemonId || 1) - 1);
    navigatePokemon(prev);
  };

  const handleNext = () => {
    const next = Math.min(1025, (pokemonId || 1) + 1);
    navigatePokemon(next);
  };

  const sidebarContent = (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
      {/* Close button - mobile */}
      <div className="flex md:hidden items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{t('sidebar.pokemon')}</span>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-lg active:scale-90"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>


      <div className="flex justify-center">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 72, height: 72,
            background: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
        >
          {loading ? (
            <LoadingSpinner size={20} />
          ) : spriteSmall ? (
            <img
              src={spriteSmall}
              alt={name}
              className="w-16 h-16 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            <div className="text-lg" style={{ color: 'var(--muted-foreground)' }}>?</div>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-9 h-9 md:w-8 md:h-8 rounded-lg transition-colors active:scale-90"
          style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
          aria-label="Previous Pokémon"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div className="flex-1">
          <input
            type="number"
            className="w-full px-3 py-2 md:py-1.5 text-sm text-center rounded-lg outline-none transition-colors [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min={1} max={1025}
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            onBlur={() => {
              const val = parseInt(inputId);
              if (!isNaN(val) && val > 0 && val <= 1025) navigatePokemon(val);
              else setInputId(String(pokemonId || ''));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = parseInt(inputId);
                if (!isNaN(val) && val > 0 && val <= 1025) navigatePokemon(val);
                else setInputId(String(pokemonId || ''));
              }
            }}
            style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            aria-label="Pokémon number"
          />
        </div>
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-9 h-9 md:w-8 md:h-8 rounded-lg transition-colors active:scale-90"
          style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
          aria-label="Next Pokémon"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>

      <div className="relative">
        <SearchInput value={searchTerm} onChange={(v) => { searchPokemon(v); setShowSuggestions(v.length > 0); }} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} onKeyDown={(e) => { if (e.key === 'Enter' && suggestions.length > 0) handleSelect(suggestions[0].id); }} placeholder={t('nav.search')} />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 mt-1 rounded-lg border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            {suggestions.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors hover:opacity-80"
                style={{ color: 'var(--foreground)' }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} alt={p.name} className="w-6 h-6 object-contain" style={{ imageRendering: 'pixelated' }} />
                <span className="font-mono opacity-60 mr-1">#{String(p.id).padStart(3, '0')}</span>
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button size="sm" variant="secondary" icon={<RandomIcon />} onClick={getRandomPokemon}>{t('nav.random')}</Button>
        <Toggle enabled={shiny} onChange={setShiny} label={t('nav.shiny')} />
      </div>

      <div className="border-t" style={{ borderColor: 'var(--sidebar-border)' }} />

      {loading ? (
        <LoadingSpinner size={24} />
      ) : pokemon ? (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
              {t('sidebar.colors')} ({colorCount})
            </span>
            <select
              value={colorCount}
              onChange={(e) => setColorCount(parseInt(e.target.value))}
              className="text-xs rounded-lg px-2 py-1 outline-none"
              style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            >
              {[3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          {paletteLoading ? (
            <LoadingSpinner size={16} />
          ) : (
            <div className="space-y-1.5">
              {colors.map((color, i) => (
                <div key={i} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'var(--muted)' }}>
                  <div className="w-7 h-7 md:w-6 md:h-6 rounded-md flex-shrink-0 border" style={{ background: color.hex, borderColor: 'var(--border)' }} />
                  <input type="text" value={color.hex} onChange={(e) => updateColor(i, e.target.value)} className="flex-1 text-xs font-mono font-medium bg-transparent outline-none" style={{ color: 'var(--foreground)' }} />
                      <button onClick={() => toggleLock(i)} className="p-1.5 md:p-1 rounded active:scale-90" style={{ color: color.locked ? 'var(--primary)' : 'var(--muted-foreground)' }}><LockIcon locked={color.locked} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('nav.search')}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar (overlay) */}
      <aside
        className={`md:hidden flex flex-col overflow-hidden transition-all duration-300 z-50 fixed inset-y-0 left-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '80vw', maxWidth: 320, background: 'var(--sidebar)' }}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar (inline) */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0 overflow-hidden transition-all duration-300 border-r"
        style={{
          width: open ? 320 : 0,
          minWidth: open ? 320 : 0,
          borderColor: 'var(--sidebar-border)',
          background: 'var(--sidebar)',
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
