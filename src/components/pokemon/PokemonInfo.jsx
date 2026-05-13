import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import Badge from '../ui/Badge';
import { TYPE_COLORS } from '../../utils/constants';

function flattenEvolutionChain(chain) {
  const result = [];
  let current = chain;
  while (current) {
    result.push(current.species);
    current = current.evolves_to?.[0] || null;
  }
  return result;
}

export default function PokemonInfo() {
  const { t, i18n } = useTranslation();
  const { pokemon, species, evolutionChain, colors, navigatePokemon, shiny } = usePokemonContext();

  const types = pokemon?.types?.map(t => t.type.name) || [];
  const lang = i18n.language?.split('-')[0] || 'en';
  const description = species?.flavor_text_entries
    ?.find(e => e.language.name === lang)
    ?.flavor_text?.replace(/[\n\f]/g, ' ') || species?.flavor_text_entries
    ?.find(e => e.language.name === 'en')
    ?.flavor_text?.replace(/[\n\f]/g, ' ') || '';
  const genus = species?.genera?.find(g => g.language.name === lang)?.genus || species?.genera?.find(g => g.language.name === 'en')?.genus || '';
  const habitatRaw = species?.habitat?.name || null;
  const habitat = habitatRaw ? t('habitat.' + habitatRaw) : null;
  const growthRateRaw = species?.growth_rate?.name || null;
  const growthRate = growthRateRaw ? t('growth.' + growthRateRaw) : null;
  const captureRate = species?.capture_rate ?? null;
  const baseHappiness = species?.base_happiness ?? null;
  const eggGroups = species?.egg_groups?.map(g => g.name) || [];
  const abilities = pokemon?.abilities || [];
  const evoChain = evolutionChain?.chain ? flattenEvolutionChain(evolutionChain.chain) : [];

  const formatName = (s) => s?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';

  return (
    <section className="rounded-xl p-5 border space-y-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
        {t('pokedex.entry')}
      </h2>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-mono font-medium" style={{ color: 'var(--muted-foreground)' }}>
          #{String(pokemon?.id || '').padStart(3, '0')}
        </span>
        {genus && (
          <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>· {genus}</span>
        )}
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {description || t('pokedex.noDescription')}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {types.map(type => (
          <Badge key={type} color={TYPE_COLORS[type]} size="sm">
            {t('type.' + type)}
          </Badge>
        ))}
      </div>

      {/* Abilities */}
      {abilities.length > 0 && (
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.abilities')}</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {abilities.map(ab => (
              <span key={ab.ability.name} className="text-xs" style={{ color: 'var(--foreground)' }}>
                {t('ability.' + ab.ability.name, formatName(ab.ability.name))}
                {ab.is_hidden && (
                  <span className="text-[10px] ml-1 px-1 py-0.5 rounded" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>{t('pokedex.hidden')}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Evolution Chain */}
      {evoChain.length > 0 && (
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.evolution')}</span>
          <div className="flex items-center mt-2">
            {evoChain.map((evo, i) => {
              const id = parseInt(evo.url.replace(/\/$/, '').split('/').pop());
              const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shiny ? 'shiny/' : ''}${id}.png`;
              const isCurrent = evo.name === pokemon?.name;
              return (
                  <button key={evo.name} onClick={() => navigatePokemon(id)} className="flex items-center">
                  {i > 0 && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 mx-1" style={{ color: 'var(--muted-foreground)' }}>
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                  <div
                    className="flex flex-col items-center rounded-xl px-2 py-1.5"
                    style={{
                      background: isCurrent ? `${colors?.[0]?.hex}20` : 'var(--muted)',
                      border: isCurrent ? `1px solid ${colors?.[0]?.hex}40` : '1px solid transparent',
                    }}
                  >
                    <img
                      src={spriteUrl}
                      alt={evo.name}
                      className="w-10 h-10 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <span className="text-[10px] font-medium mt-0.5" style={{ color: isCurrent ? 'var(--primary)' : 'var(--foreground)' }}>
                      {formatName(evo.name)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Extra info grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {habitat && (
          <div>
            <span className="text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.habitat')}</span>
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{formatName(habitat)}</p>
          </div>
        )}
        {growthRate && (
          <div>
            <span className="text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.growth')}</span>
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{formatName(growthRate)}</p>
          </div>
        )}
        {captureRate !== null && (
          <div>
            <span className="text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.capture')}</span>
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{captureRate}</p>
          </div>
        )}
        {baseHappiness !== null && (
          <div>
            <span className="text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.happiness')}</span>
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{baseHappiness}</p>
          </div>
        )}
      </div>

      {/* Egg Groups */}
      {eggGroups.length > 0 && (
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('pokedex.eggGroups')}</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {eggGroups.map(g => (
              <span key={g} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                {t('eggGroup.' + g)}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
