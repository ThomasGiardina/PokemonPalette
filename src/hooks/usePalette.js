import { useState, useEffect, useCallback, useRef } from 'react';
import { extractColorsFromImageUrl } from '../utils/colorExtractor';

export function usePalette(spriteUrl, colorCount = 6) {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const lockedRef = useRef({});

  const regenerate = useCallback(async () => {
    if (!spriteUrl) return;
    setLoading(true);
    try {
      const extracted = await extractColorsFromImageUrl(spriteUrl, colorCount);
      const merged = extracted.map((c, i) => {
        const locked = lockedRef.current[i];
        return locked ? { ...locked, locked: true, count: c.count, luminance: c.luminance } : c;
      });
      setColors(merged);
    } catch {
      setColors([]);
    } finally {
      setLoading(false);
    }
  }, [spriteUrl, colorCount]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const toggleLock = useCallback((index) => {
    setColors(prev => {
      const next = prev.map((c, i) => {
        if (i !== index) return c;
        const newLocked = !c.locked;
        if (newLocked) {
          lockedRef.current[index] = { hex: c.hex, original: c.original || c.hex };
        } else {
          delete lockedRef.current[index];
        }
        return { ...c, locked: newLocked };
      });
      return next;
    });
  }, []);

  const updateColor = useCallback((index, hex) => {
    setColors(prev => prev.map((c, i) => {
      if (i !== index) return c;
      if (c.locked) lockedRef.current[index] = { hex, original: hex };
      return { ...c, hex, original: hex };
    }));
  }, []);

  return { colors, loading, regenerate, toggleLock, updateColor, setColors };
}
