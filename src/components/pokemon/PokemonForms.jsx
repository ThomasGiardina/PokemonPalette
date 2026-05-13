import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';

export default function PokemonForms() {
  const { t } = useTranslation();
  const { pokemon, species, evolutionChain } = usePokemonContext();

  const forms = pokemon?.forms || [];
  const varieties = species?.varieties || [];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>{t('forms.title')}</h4>
        <div className="flex flex-wrap gap-2">
          {forms.map(form => (
            <span
              key={form.name}
              className="px-2.5 py-1 text-xs rounded-lg"
              style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
            >
              {form.name.replace(/-/g, ' ')}
            </span>
          ))}
          {forms.length === 0 && (
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('forms.empty')}</span>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>{t('forms.varieties')}</h4>
        <div className="flex flex-wrap gap-2">
          {varieties.map(v => (
            <span
              key={v.pokemon.name}
              className="px-2.5 py-1 text-xs rounded-lg"
              style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
            >
              {v.pokemon.name.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
