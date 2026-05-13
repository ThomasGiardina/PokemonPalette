import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import PokemonHero from '../pokemon/PokemonHero';
import PaletteGrid from '../palette/PaletteGrid';
import PokemonInfo from '../pokemon/PokemonInfo';
import PokemonStats from '../pokemon/PokemonStats';
import PokemonTraits from '../pokemon/PokemonTraits';
import ColorShowcase from '../palette/ColorShowcase';
import ThemeExport from '../theme/ThemeExport';
import ThemePreview from '../theme/ThemePreview';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function MainContent() {
  const { t } = useTranslation();
  const { pokemon, colors, loading } = usePokemonContext();

  const emptyTitle = t('hero.emptyTitle');
  const emptyDesc = t('hero.emptyDesc');
  const emptyPrompt = t('hero.emptyPrompt');

  if (loading && !pokemon) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <LoadingSpinner size={36} />
      </main>
    );
  }

  if (!pokemon) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden animated-gradient px-6"
        style={{
          background: 'radial-gradient(circle at top right, #94a3b870 0%, transparent 60%)',
        }}
      >
        <div className="text-center relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading" style={{ color: 'var(--foreground)' }}>
            {emptyTitle}
          </h1>
          <p className="text-base md:text-lg" style={{ color: 'var(--muted-foreground)' }}>
            {emptyDesc}
          </p>
        </div>
        <p className="mt-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {emptyPrompt}
        </p>
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-size: 120% 120%; }
            50% { background-size: 200% 200%; }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto" style={{ background: 'var(--background)' }}>
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-size: 120% 120%; }
          50% { background-size: 200% 200%; }
        }
      `}</style>
      <div
        className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px] py-6 sm:py-8 md:py-16 flex items-center relative overflow-hidden animated-gradient"
        style={{
          background: `radial-gradient(circle at top right, ${colors?.[0]?.hex || '#94a3b8'}30 0%, ${colors?.[0]?.hex || '#94a3b8'}10 50%, transparent 80%)`,
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{
          background: `linear-gradient(to bottom, transparent, var(--background))`,
        }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <PokemonHero />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-5 sm:space-y-6 md:space-y-8 -mt-3 sm:-mt-4 relative z-20">
        <PaletteGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <PokemonInfo />
          <div className="space-y-6">
            <PokemonTraits />
            <PokemonStats />
          </div>
        </div>

        <ColorShowcase />

        <ThemePreview />
        <ThemeExport />

        <footer className="pt-8 pb-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Pokémon Swatch</h3>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {t('footer.desc')}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                {t('footer.notAffiliated')}
              </p>
            </div>
            <div />
            <div className="text-right">
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('footer.poweredBy')}</h4>
              <div className="space-y-2">
                <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="block text-xs" style={{ color: 'var(--muted-foreground)' }}>PokéAPI</a>
                <div className="flex items-center justify-end gap-3 mt-1">
                  <a href="https://github.com/ThomasGiardina" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-foreground)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/thomas-agustin-giardina-484a86324/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-foreground)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>v{new Date().getFullYear()}</span>
                </div>
                <p className="text-[10px] mt-2" style={{ color: 'var(--muted-foreground)' }}>{t('footer.madeBy')}</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
