function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

function getColorDistance(c1, c2) {
  const dr = c1[0] - c2[0];
  const dg = c1[1] - c2[1];
  const db = c1[2] - c2[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function colorLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function isNearWhite(r, g, b) {
  return r > 230 && g > 230 && b > 230;
}

function isNearBlack(r, g, b) {
  return r < 30 && g < 30 && b < 30;
}

function quantizeColor(r, g, b, steps = 4) {
  const step = 256 / steps;
  return [
    Math.floor(r / step) * step + step / 2,
    Math.floor(g / step) * step + step / 2,
    Math.floor(b / step) * step + step / 2,
  ];
}

function extractColorsFromCanvas(canvas, count = 6) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  const colorMap = new Map();

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];

    if (a < 128) continue;
    if (isNearWhite(r, g, b)) continue;
    if (isNearBlack(r, g, b)) continue;

    const [qr, qg, qb] = quantizeColor(r, g, b);
    const key = `${qr},${qg},${qb}`;

    if (colorMap.has(key)) {
      colorMap.get(key).count++;
    } else {
      colorMap.set(key, { r: qr, g: qg, b: qb, rOrig: r, gOrig: g, bOrig: b, count: 1 });
    }
  }

  const sorted = Array.from(colorMap.values()).sort((a, b) => b.count - a.count);

  const selected = [];
  for (const color of sorted) {
    const isDuplicate = selected.some(s => getColorDistance(
      [s.r, s.g, s.b], [color.r, color.g, color.b]
    ) < 60);

    if (!isDuplicate) {
      selected.push(color);
    }
    if (selected.length >= count) break;
  }

  while (selected.length < count) {
    selected.push({ r: 100, g: 120, b: 140, count: 1 });
  }

  selected.sort((a, b) => colorLuminance(b.r, b.g, b.b) - colorLuminance(a.r, a.g, a.b));

  return selected.map(c => ({
    hex: rgbToHex(c.r, c.g, c.b),
    original: rgbToHex(c.rOrig, c.gOrig, c.bOrig),
    count: c.count,
    luminance: colorLuminance(c.r, c.g, c.b),
    locked: false,
  }));
}

export function extractColorsFromImageUrl(url, count = 6) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);
      const colors = extractColorsFromCanvas(canvas, count);
      resolve(colors);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

export function generateThemeCSS(colors, mode = 'dark') {
  const [primary, secondary, accent, ...rest] = colors;
  const p = primary?.hex || '#395a83';
  const s = secondary?.hex || '#5283c5';
  const a = accent?.hex || '#183973';

  const bg = mode === 'dark' ? '#14171a' : '#fcfcfd';
  const fg = mode === 'dark' ? '#f4f5f6' : '#151e28';
  const card = mode === 'dark' ? '#1b2127' : '#ffffff';
  const muted = mode === 'dark' ? '#252d37' : '#f2f4f7';
  const mutedFg = mode === 'dark' ? '#98a4b3' : '#627084';
  const border = mode === 'dark' ? '#2d3743' : '#e0e5eb';

  const primaryFg = '#ffffff';
  const secondaryFg = '#ffffff';
  const accentFg = '#ffffff';

  return `:root${mode === 'dark' ? '' : ''} {
  --background: ${bg};
  --foreground: ${fg};
  --card: ${card};
  --card-foreground: ${fg};
  --popover: ${card};
  --popover-foreground: ${fg};
  --primary: ${p};
  --primary-foreground: ${primaryFg};
  --secondary: ${s};
  --secondary-foreground: ${secondaryFg};
  --muted: ${muted};
  --muted-foreground: ${mutedFg};
  --accent: ${a};
  --accent-foreground: ${accentFg};
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: ${border};
  --input: ${border};
  --ring: ${p};
  --chart-1: ${p};
  --chart-2: ${s};
  --chart-3: ${a};
}`;
}

export function generateTailwindV3Config(colors) {
  const [primary, secondary, accent] = colors;
  return {
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          primary: {
            DEFAULT: primary?.hex || '#395a83',
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: secondary?.hex || '#5283c5',
            foreground: '#ffffff',
          },
          accent: {
            DEFAULT: accent?.hex || '#183973',
            foreground: '#ffffff',
          },
        },
      },
    },
  };
}
