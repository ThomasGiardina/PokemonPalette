import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import { getSpriteUrl } from '../../utils/api';
import { hexToRgb, luminance } from '../../utils/contrast';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function PokemonHero() {
  const { t } = useTranslation();
  const { pokemon, loading, shiny, colors } = usePokemonContext();

  const name = pokemon?.name
    ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : 'Pokémon';

  const sprite = pokemon ? getSpriteUrl(pokemon, shiny) : null;

  const primaryHex = colors?.[0]?.hex || '#395a83';
  const nameColor = luminance(primaryHex) > 0.4
    ? `color-mix(in srgb, ${primaryHex}, #000 50%)`
    : primaryHex;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-20">
      <div className="flex-shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
        {loading ? (
          <LoadingSpinner size={32} />
        ) : sprite ? (
          <img
            src={sprite}
            alt={name}
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 40px color-mix(in srgb, var(--primary) 50%, transparent))',
            }}
          />
        ) : null}
      </div>
      <div className="min-w-0 max-w-lg">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 break-words" style={{ color: nameColor }}>
          {name}
        </h1>
        <p className="text-base md:text-lg" style={{ color: 'var(--muted-foreground)' }}>
          {t('hero.desc')}
        </p>
      </div>
    </div>
  );
}



