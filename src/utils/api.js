const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemon(idOrName) {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error('Pokémon not found');
  return res.json();
}

export async function fetchSpecies(id) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!res.ok) throw new Error('Species not found');
  return res.json();
}

export async function fetchEvolutionChain(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Evolution chain not found');
  return res.json();
}

export function getSpriteUrl(pokemon, shiny = false) {
  if (shiny) {
    return (
      pokemon.sprites.other?.home?.front_shiny ||
      pokemon.sprites.other?.['official-artwork']?.front_shiny ||
      pokemon.sprites.front_shiny
    );
  }
  return (
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default
  );
}

export async function fetchPokemonList() {
  const res = await fetch(`${BASE_URL}/pokemon?limit=1025&offset=0`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  const data = await res.json();
  return data.results.map((p, i) => ({ name: p.name, id: i + 1 }));
}

export function extractIdFromUrl(url) {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1]);
}
