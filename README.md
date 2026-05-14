# Pokémon Swatch

Agarrá un Pokémon, sacá sus colores, convertilo en un theme.

Tirás el nombre o número de cualquier Pokémon y la app te extrae una paleta de colores directo de su sprite. Después la podés previsualizar en componentes UI de verdad y exportarla como config de Tailwind, CSS o JSON. Eso es básicamente todo.

## Cómo funciona

El corazón de la app es un extractor de colores por canvas. Agarra el sprite del Pokémon, lo escala a 64x64, cuantiza los colores, descarta negros y blancos cercanos, y te devuelve los tonos dominantes ordenados por luminosidad. No es magia, es matemática berreta pero funcional.

```
Pokémon → PokéAPI → sprite → canvas → color quantization → paleta
```

## Features

- **Selector de Pokémon**: por número, nombre, búsqueda con autocomplete, o random
- **Shiny**: toggle para ver la variante shiny (algunas tienen paletas mucho más copadas)
- **Cantidad de colores**: 3, 4, 5 o 6 colores por paleta
- **Lock por color**: si regenerás la paleta (cambiando de Pokémon), los colores trabados se mantienen
- **Edición manual**: podés cambiar cualquier hex code a mano
- **Vista previa de componentes**: botones, alerts, badges, progress bars, dashboards, formularios, tablas, cards, toggles — todo con los colores de tu paleta
- **Exportación**: Tailwind v4 (`@theme inline`), Tailwind v3 (`tailwind.config.js`), CSS custom properties, JSON plano
- **Info del Pokémon**: tipos, habilidades, stats, cadena evolutiva, hábitat, grupos huevo, altura, peso, flavor text
- **Dark/Light mode**: la paleta se adapta a ambos modos
- **Idiomas**: español e inglés (cambiable desde el sidebar)

## Stack

- React 19
- Vite 8
- Tailwind CSS 3
- i18next + react-i18next
- Lucide React (iconos)
- PokéAPI (https://pokeapi.co)

## Cómo levantar

```bash
npm install
npm run dev
```

Para build de producción:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── components/
│   ├── layout/        # TopNav, ControlSidebar, MainContent
│   ├── palette/       # PaletteGrid, ColorSwatch, ColorShowcase
│   ├── pokemon/       # PokemonHero, PokemonInfo, PokemonStats, PokemonTraits, PokemonForms
│   ├── theme/         # ThemePreview, ThemeExport
│   └── ui/            # Button, Badge, Toggle, SearchInput, ProgressBar, TabSelector, CodeBlock, Icons, LoadingSpinner
├── context/           # PokemonContext (estado global)
├── hooks/             # usePokemon, usePalette, useTheme
├── utils/             # api, colorExtractor, contrast, constants, i18n
├── locales/           # en.json, es.json
└── App.jsx
```

## Cosas a mejorar (si alguien quiere forkear)

- El extractor de colores es medio pelo, se podría mejorar con k-means de verdad
- No cubre todos los Pokémon (solo hasta Gen 8, id 898, para random)
- La vista preview mobile zafa pero se podría ajustar mejor
- Faltan más idiomas

## Disclaimer

Esto no está afiliado ni con The Pokémon Company ni con Nintendo. Es un proyecto al pedo que hice porque me gustan los colores y los Pokémon.

## Créditos

- [PokéAPI](https://pokeapi.co) — la API de Pokémon más grossa que existe
- Thomas Giardina — thomasgiardina0@gmail.com
