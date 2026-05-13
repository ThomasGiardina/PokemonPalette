import { usePokemonContext } from '../../context/PokemonContext';
import ColorSwatch from './ColorSwatch';

export default function PaletteGrid() {
  const { colors, paletteLoading } = usePokemonContext();

  if (paletteLoading) {
    return (
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="flex-1 h-32 rounded-xl animate-pulse"
            style={{ background: 'var(--muted)' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color, i) => (
        <div key={i} className="flex-1 min-w-[100px]">
          <ColorSwatch color={color.hex} index={i} />
        </div>
      ))}
    </div>
  );
}
