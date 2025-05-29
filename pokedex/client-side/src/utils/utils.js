export const getPokemonImageUrl = (pokeId) =>
  pokeId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
    : "https://via.placeholder.com/48?text=No+Image";
