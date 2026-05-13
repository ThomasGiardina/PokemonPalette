import { useEffect } from 'react';
import { getContrastColor } from '../utils/contrast';

export function useTheme(colors, mode = 'dark') {
  useEffect(() => {
    const root = document.documentElement;

    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    if (!colors?.length) return;

    const [primary, secondary, accent] = colors;

    root.style.setProperty('--primary', primary?.hex || '#395a83');
    root.style.setProperty('--primary-foreground', getContrastColor(primary?.hex));
    root.style.setProperty('--secondary', secondary?.hex || '#5283c5');
    root.style.setProperty('--secondary-foreground', getContrastColor(secondary?.hex));
    root.style.setProperty('--accent', accent?.hex || '#183973');
    root.style.setProperty('--accent-foreground', getContrastColor(accent?.hex));
    root.style.setProperty('--ring', primary?.hex || '#395a83');
  }, [colors, mode]);
}
