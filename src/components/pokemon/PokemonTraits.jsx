import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';

export default function PokemonTraits() {
  const { t } = useTranslation();
  const { pokemon } = usePokemonContext();

  if (!pokemon) return null;

  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;

  return (
    <section className="rounded-xl p-6 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
        {t('traits.title')}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('traits.height')}</span>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>{height.toFixed(1)} m</p>
        </div>
        <div>
          <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('traits.weight')}</span>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>{weight.toFixed(1)} kg</p>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('traits.abilities')}</span>
        <div className="mt-1 space-y-1">
          {pokemon.abilities?.map(ab => (
            <div key={ab.ability.name} className="flex items-center gap-2">
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                {ab.ability.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              {ab.is_hidden && (
                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                  {t('pokedex.hidden')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
