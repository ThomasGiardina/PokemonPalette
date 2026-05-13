import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyIcon, CheckIcon } from './Icons';

export default function CodeBlock({ code, language }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg transition-colors"
          style={{ color: copied ? 'var(--primary)' : 'var(--muted-foreground)' }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? t('color.copied') : t('color.copy')}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono" style={{ color: 'var(--foreground)' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
