import { useState, useEffect } from 'react';
import { fetchPokemon, fetchSpecies, fetchEvolutionChain } from '../utils/api';

export function usePokemon(idOrName) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrName && idOrName !== 0) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const pokeData = await fetchPokemon(idOrName);
        if (cancelled) return;

        const speciesData = await fetchSpecies(pokeData.id);
        if (cancelled) return;

        let evoData = null;
        if (speciesData.evolution_chain?.url) {
          try {
            evoData = await fetchEvolutionChain(speciesData.evolution_chain.url);
          } catch {}
        }

        if (!cancelled) {
          setPokemon(pokeData);
          setSpecies(speciesData);
          setEvolutionChain(evoData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [idOrName]);

  return { pokemon, species, evolutionChain, loading, error };
}
