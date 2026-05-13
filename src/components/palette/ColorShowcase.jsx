import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import Badge from '../ui/Badge';

export default function ColorShowcase() {
  const { t } = useTranslation();
  const { colors } = usePokemonContext();

  const primary = colors[0]?.hex || 'var(--primary)';
  const secondary = colors[1]?.hex || 'var(--secondary)';
  const outline = colors[2]?.hex || 'var(--accent)';

  return (
    <section className="rounded-xl p-6 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
        {t('showcase.title')}
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>{t('showcase.badges')}</p>
          <div className="flex flex-wrap gap-2">
            <Badge color={primary} size="md">{t('preview.primary')}</Badge>
            <Badge color={secondary} size="md">{t('preview.secondary')}</Badge>
            <Badge color={outline} size="md">{t('preview.outline')}</Badge>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>{t('showcase.variations')}</p>
          <div className="grid grid-cols-3 gap-2">
            {[primary, secondary, outline].map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="h-16 rounded-lg border" style={{ background: c, borderColor: 'var(--border)' }} />
                <span className="text-[10px] font-mono block" style={{ color: 'var(--muted-foreground)' }}>
                  {[t('preview.primary'), t('preview.secondary'), t('preview.outline')][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
