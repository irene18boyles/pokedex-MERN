import { getPokemonImageUrl } from '../utils/utils.js';

export default function PokemonList({ pokemons, deletePokemon, loading, hasMore, loadMore }) {
  return (
    <>
      <ul className="list">
        {pokemons.map(pokemon => (
          <li key={pokemon._id} className="list-item">
            <img
              src={getPokemonImageUrl(pokemon.pokeId)}
              alt={pokemon.name}
              width={48}
              height={48}
              style={{ marginRight: 12 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23ccc'/%3E%3Ctext x='24' y='30' font-size='24' text-anchor='middle' fill='%23000'%3E?%3C/text%3E%3C/svg%3E";
              }}
            />
            {pokemon.name}
            <button
              onClick={() => deletePokemon(pokemon._id)}
              disabled={loading}
              className="delete-btn"
              aria-label={`Delete ${pokemon.name}`}
              style={{ marginLeft: 'auto' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <button
          onClick={loadMore}
          disabled={loading}
          className="load-more-btn"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      ) : (
        <p className="no-more-text">No more pokemons to load.</p>
      )}
    </>
  );
}
