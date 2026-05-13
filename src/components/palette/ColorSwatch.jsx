import { useState } from 'react';
import { CopyIcon, CheckIcon } from '../ui/Icons';

export default function ColorSwatch({ color, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      style={{ height: 140 }}
      onClick={handleCopy}
    >
      <div
        className="w-full h-full transition-all duration-200"
        style={{ background: color }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-white drop-shadow">
            {color}
          </span>
          <span className="text-white/80">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="text-[10px] font-mono text-white/50 drop-shadow">#{index + 1}</span>
      </div>
    </div>
  );
}
