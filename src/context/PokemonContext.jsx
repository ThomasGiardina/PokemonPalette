import { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { usePalette } from '../hooks/usePalette';
import { useTheme } from '../hooks/useTheme';
import { getSpriteUrl, fetchPokemonList } from '../utils/api';

const PokemonContext = createContext(null);

export function PokemonProvider({ children }) {
  const [pokemonId, setPokemonId] = useState(() => Math.floor(Math.random() * 1025) + 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [colorCount, setColorCount] = useState(5);
  const [activeTab, setActiveTab] = useState('palette');
  const [themeMode, setThemeMode] = useState('dark');
  const [randomize, setRandomize] = useState(false);
  const [shiny, setShiny] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemonList().then(setPokemonList).catch(() => {});
  }, []);

  const suggestions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];
    return pokemonList
      .filter(p => p.name.includes(term))
      .slice(0, 10);
  }, [searchTerm, pokemonList]);

  const { pokemon, species, evolutionChain, loading, error } = usePokemon(pokemonId);

  const spriteUrl = pokemon ? getSpriteUrl(pokemon, shiny) : null;
  const spriteSmall = pokemon?.sprites?.front_shiny && shiny
    ? pokemon.sprites.front_shiny
    : pokemon?.sprites?.front_default;

  const { colors, loading: paletteLoading, regenerate, toggleLock, updateColor } = usePalette(spriteUrl, colorCount);

  useTheme(colors, themeMode);

  const navigatePokemon = useCallback((id) => {
    setPokemonId(id);
    setSearchTerm('');
  }, []);

  const searchPokemon = useCallback((term) => {
    setSearchTerm(term.toLowerCase().trim());
  }, []);

  const getRandomPokemon = useCallback(() => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    navigatePokemon(randomId);
  }, [navigatePokemon]);

  const randomIntervalRef = useRef(null);

  useEffect(() => {
    if (randomize) {
      getRandomPokemon();
      randomIntervalRef.current = setInterval(() => {
        const randomId = Math.floor(Math.random() * 898) + 1;
        navigatePokemon(randomId);
      }, 4000);
    }
    return () => {
      if (randomIntervalRef.current) {
        clearInterval(randomIntervalRef.current);
        randomIntervalRef.current = null;
      }
    };
  }, [randomize, navigatePokemon]);

  return (
    <PokemonContext.Provider value={{
      pokemon, species, evolutionChain, loading, error,
      colors, paletteLoading, regenerate, toggleLock, updateColor,
      pokemonId, navigatePokemon, searchTerm, searchPokemon,
      colorCount, setColorCount, activeTab, setActiveTab,
      themeMode, setThemeMode, randomize, setRandomize,
      getRandomPokemon, shiny, setShiny, spriteSmall, spriteUrl,
      suggestions,
    }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('usePokemonContext must be used within PokemonProvider');
  return ctx;
}
