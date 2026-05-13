import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import { getContrastColor } from '../../utils/contrast';

export default function ThemePreview() {
  const { t } = useTranslation();
  const { colors } = usePokemonContext();
  const [activeTab, setActiveTab] = useState('overview');

  if (!colors?.length) return null;

  const primary = colors[0]?.hex || '#395a83';
  const secondary = colors[1]?.hex || '#5283c5';
  const accent = colors[2]?.hex || '#183973';

  const tabs = [
    { id: 'overview', label: t('preview.overview') },
    { id: 'dashboard', label: t('preview.dashboard') },
    { id: 'forms', label: t('preview.forms') },
    { id: 'cards', label: t('preview.cards') },
  ];

  return (
    <section className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="p-5 pb-0">
        <h2 className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
          {t('preview.title')}
        </h2>
        <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--muted-foreground)' }}>
          {t('preview.subtitle')}
        </p>
        <div className="overflow-x-auto -mx-5 px-5 mb-4 scrollbar-none">
          <div className="flex gap-1 w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                style={{
                  background: activeTab === tab.id ? primary : 'var(--muted)',
                  color: activeTab === tab.id ? getContrastColor(primary) : 'var(--muted-foreground)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        {activeTab === 'overview' && <OverviewDemo primary={primary} secondary={secondary} accent={accent} t={t} />}
        {activeTab === 'dashboard' && <DashboardDemo primary={primary} secondary={secondary} accent={accent} t={t} />}
        {activeTab === 'forms' && <FormsDemo primary={primary} secondary={secondary} accent={accent} t={t} />}
        {activeTab === 'cards' && <CardsDemo primary={primary} secondary={secondary} accent={accent} t={t} />}
      </div>
    </section>
  );
}

function OverviewDemo({ primary, secondary, accent, t }) {
  return (
    <div className="space-y-5">
      {/* Colors bar */}
      <div className="flex h-8 rounded-lg overflow-hidden">
        {[primary, secondary, accent].map((c, i) => (
          <div key={i} className="flex-1 flex items-center justify-center text-[10px] font-mono font-medium" style={{ background: c, color: getContrastColor(c) }}>
            {c}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div>
        <p className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.buttons')}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg" style={{ background: primary, color: getContrastColor(primary) }}>{t('preview.primary')}</button>
          <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg" style={{ background: secondary, color: getContrastColor(secondary) }}>{t('preview.secondary')}</button>
          <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg" style={{ background: accent, color: getContrastColor(accent) }}>{t('preview.accent')}</button>
          <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>{t('preview.ghost')}</button>
          <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg" style={{ color: 'var(--foreground)', border: '1px solid var(--border)' }}>{t('preview.outline')}</button>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <p className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.alerts')}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: `${primary}15`, border: `1px solid ${primary}30` }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: primary, color: getContrastColor(primary) }}>i</div>
            <p className="text-xs" style={{ color: primary }}>{t('preview.infoAlert')}</p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: accent, color: getContrastColor(accent) }}>!</div>
            <p className="text-xs" style={{ color: accent }}>{t('preview.warningAlert')}</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <p className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.badges')}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: `${primary}20`, color: primary }}>{t('preview.primary')}</span>
          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: `${secondary}20`, color: secondary }}>{t('preview.secondary')}</span>
          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: `${accent}20`, color: accent }}>{t('preview.accent')}</span>
          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>{t('preview.muted')}</span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <p className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.progress')}</p>
        <div className="space-y-2">
          {[
            { label: t('preview.design'), pct: 85, color: primary },
            { label: t('preview.development'), pct: 60, color: secondary },
            { label: t('preview.testing'), pct: 35, color: accent },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span style={{ color: 'var(--foreground)' }}>{item.label}</span>
                <span style={{ color: 'var(--muted-foreground)' }}>{item.pct}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'var(--muted)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div>
        <p className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.toggles')}</p>
        <div className="flex gap-3">
          <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ background: primary }}>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow" style={{ transform: 'translateX(16px)' }} />
          </div>
          <div className="w-10 h-5 rounded-full relative" style={{ background: 'var(--border)' }}>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardDemo({ primary, secondary, accent, t }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: primary }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-white/20" />
          <span className="text-sm font-semibold" style={{ color: getContrastColor(primary) }}>{t('preview.dashboard')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full bg-white/20" />
          <div className="w-7 h-7 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3" style={{ background: 'var(--background)' }}>
        {[
          { label: 'Users', value: '2,847', change: '+12%', up: true },
          { label: 'Revenue', value: '$48.2k', change: '+8.1%', up: true },
          { label: 'Orders', value: '1,423', change: '-3.2%', up: false },
          { label: 'Growth', value: '89%', change: '+4.5%', up: true },
        ].map((stat, i) => (
          <div key={i} className="p-3 rounded-lg border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
            <div className="text-lg font-bold mt-0.5" style={{ color: 'var(--foreground)' }}>{stat.value}</div>
            <div className="text-[10px] font-medium mt-1" style={{ color: stat.up ? '#22c55e' : '#ef4444' }}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-2 gap-2 p-3 pt-0" style={{ background: 'var(--background)' }}>
        <div className="p-3 rounded-lg border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="text-[10px] font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>{t('preview.revenueChart')}</div>
          <div className="h-20 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 3 ? primary : i === 5 ? secondary : `${primary}40` }} />
            ))}
          </div>
        </div>
        <div className="p-3 rounded-lg border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="text-[10px] font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>{t('preview.topPages')}</div>
          {['Home', 'Products', 'Pricing', 'Blog'].map((page, i) => (
            <div key={i} className="flex items-center gap-2 py-1 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: i === 0 ? primary : i === 1 ? secondary : accent }} />
              <span className="text-[11px] flex-1" style={{ color: 'var(--foreground)' }}>{page}</span>
              <span className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>{[1200, 850, 620, 410][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormsDemo({ primary, secondary, accent, t }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Input Fields */}
      <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.inputs')}</p>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>{t('preview.email')}</label>
            <input
              type="email"
              placeholder={t('preview.emailPlaceholder')}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            />
          </div>
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>{t('preview.password')}</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            />
          </div>
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>{t('preview.focus')}</label>
            <input
              type="text"
              placeholder="Focused input"
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{ background: 'var(--muted)', color: 'var(--foreground)', border: `2px solid ${primary}` }}
            />
          </div>
          <button className="w-full py-2 text-sm font-medium rounded-lg" style={{ background: primary, color: getContrastColor(primary) }}>
            {t('preview.signIn')}
          </button>
        </div>
      </div>

      {/* Select + Checkboxes */}
      <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.selects')}</p>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>{t('preview.role')}</label>
            <select
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{ background: 'var(--muted)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            >
              <option>{t('preview.developer')}</option>
              <option>{t('preview.designer')}</option>
              <option>{t('preview.manager')}</option>
            </select>
          </div>
          <div className="space-y-1.5">
            {[t('preview.optionA'), t('preview.optionB'), t('preview.optionC')].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center"
                  style={{ background: i === 0 ? primary : 'var(--border)' }}
                >
                  {i === 0 && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <span className="text-xs" style={{ color: 'var(--foreground)' }}>{opt}</span>
              </label>
            ))}
          </div>
          <div className="space-y-1.5">
            {[t('preview.radio1'), t('preview.radio2')].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ border: `2px solid ${i === 0 ? primary : 'var(--border)'}` }}
                >
                  {i === 0 && <div className="w-2 h-2 rounded-full" style={{ background: primary }} />}
                </div>
                <span className="text-xs" style={{ color: 'var(--foreground)' }}>{opt}</span>
              </label>
            ))}
          </div>
          <button className="w-full py-2 text-sm font-medium rounded-lg" style={{ background: accent, color: getContrastColor(accent) }}>
            {t('preview.submit')}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="sm:col-span-2 p-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{t('preview.table')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: `1px solid var(--border)` }}>
                {[t('preview.name'), t('preview.role'), t('preview.status'), t('preview.actions')].map((h, i) => (
                  <th key={i} className="text-left py-2 px-2 font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alice Johnson', role: 'Developer', status: 'Active' },
                { name: 'Bob Smith', role: 'Designer', status: 'Away' },
                { name: 'Carol White', role: 'Manager', status: 'Active' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid var(--border)` }}>
                  <td className="py-2.5 px-2 font-medium" style={{ color: 'var(--foreground)' }}>{row.name}</td>
                  <td className="py-2.5 px-2" style={{ color: 'var(--muted-foreground)' }}>{row.role}</td>
                  <td className="py-2.5 px-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: row.status === 'Active' ? `${primary}20` : `${accent}20`,
                        color: row.status === 'Active' ? primary : accent,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-2">
                    <button className="text-[10px] font-medium px-2 py-1 rounded" style={{ color: primary }}>
                  {t('preview.edit')}
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CardsDemo({ primary, secondary, accent, t }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Pricing Card */}
      <div className="p-5 rounded-xl border text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: primary }}>{t('preview.price')}</p>
        <div className="text-3xl font-bold my-2" style={{ color: 'var(--foreground)' }}>
          $19<span className="text-sm font-normal" style={{ color: 'var(--muted-foreground)' }}>{t('preview.perMonth')}</span>
        </div>
        <div className="space-y-1.5 my-4">
          {['5 projects', '10GB storage', 'Basic support'].map((f, i) => (
            <p key={i} className="text-xs" style={{ color: 'var(--muted-foreground)' }}>✓ {f}</p>
          ))}
        </div>
        <button className="w-full py-2 text-sm font-medium rounded-lg" style={{ background: primary, color: getContrastColor(primary) }}>
          {t('preview.getStarted')}
        </button>
      </div>

      {/* Profile Card */}
      <div className="p-5 rounded-xl border text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})`, color: getContrastColor(primary) }}>
          JD
        </div>
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>John Doe</p>
        <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>john@example.com</p>
        <div className="flex justify-center gap-1.5">
          {['Design', 'Code', 'DevOps'].map((tag, i) => (
            <span key={i} className="px-2 py-0.5 text-[10px] rounded-full" style={{ background: `${i === 0 ? primary : i === 1 ? secondary : accent}15`, color: i === 0 ? primary : i === 1 ? secondary : accent }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Card */}
      <div className="p-5 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted-foreground)' }}>{t('preview.teamProgress')}</p>
        <div className="space-y-2.5">
          {[
            { label: 'Design', pct: 90, color: primary },
            { label: 'Frontend', pct: 65, color: secondary },
            { label: 'Backend', pct: 40, color: accent },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span style={{ color: 'var(--foreground)' }}>{item.label}</span>
                <span style={{ color: 'var(--muted-foreground)' }}>{item.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: 'var(--muted)' }}>
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Card */}
      <div className="p-4 rounded-xl border sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-start gap-3"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: primary, color: getContrastColor(primary) }}>
          N
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{t('preview.update')}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            A new version of the design system is ready. Check out the changelog for details on what's new.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="text-xs font-medium px-3 py-1 rounded-lg" style={{ background: primary, color: getContrastColor(primary) }}>
              {t('preview.update')}
            </button>
            <button className="text-xs font-medium px-3 py-1 rounded-lg" style={{ color: 'var(--muted-foreground)' }}>
              {t('preview.dismiss')}
            </button>
          </div>
        </div>
        <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>2m ago</span>
      </div>
    </div>
  );
}
