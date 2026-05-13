import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import { SunIcon, MoonIcon } from '../ui/Icons';

export default function TopNav({ onToggleSidebar }) {
  const { themeMode, setThemeMode } = usePokemonContext();
  const { t, i18n } = useTranslation();

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 h-14 flex-shrink-0"
      style={{
        background: 'transparent',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors md:hidden"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <a href="/" className="flex items-center gap-2.5 font-bold text-lg" style={{ color: 'var(--foreground)' }}>
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" fill="#ef4444" stroke="currentColor" strokeWidth="2" />
            <path d="M2 24h44" stroke="currentColor" strokeWidth="2" />
            <circle cx="24" cy="24" r="8" fill="white" stroke="currentColor" strokeWidth="2" />
            <circle cx="24" cy="24" r="4" fill="currentColor" />
          </svg>
          Pokémon Swatch
        </a>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors text-xs font-semibold"
          style={{ color: 'var(--muted-foreground)' }}
          title={i18n.language === 'en' ? 'Español' : 'English'}
        >
          {i18n.language === 'en' ? 'ES' : 'EN'}
        </button>

        <button
          onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
          style={{ color: 'var(--muted-foreground)' }}
          title={themeMode === 'dark' ? t('nav.light') : t('nav.dark')}
        >
          {themeMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
