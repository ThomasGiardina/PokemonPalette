import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import ProgressBar from '../ui/ProgressBar';
import { STAT_NAMES } from '../../utils/constants';

export default function PokemonStats() {
  const { t } = useTranslation();
  const { pokemon, colors } = usePokemonContext();

  const stats = pokemon?.stats || [];
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);
  const statColor = colors?.[0]?.hex || 'var(--primary)';

  return (
    <section className="rounded-xl p-6 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
        {t('stats.title')}
      </h2>
      <div className="space-y-2.5">
        {stats.map(stat => (
          <ProgressBar
            key={stat.stat.name}
            label={STAT_NAMES[stat.stat.name] || stat.stat.name}
            value={stat.base_stat}
            max={255}
            color={statColor}
          />
        ))}
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs font-medium w-14 text-right" style={{ color: 'var(--muted-foreground)' }}>{t('stats.total')}</span>
          <div className="flex-1" />
          <span className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>{total}</span>
        </div>
      </div>
    </section>
  );
}
