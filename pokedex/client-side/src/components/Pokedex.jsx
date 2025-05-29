import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonList from './PokemonList.jsx';
import AddPokemonForm from './AddPokemonForm.jsx';
import '../styles/Pokedex.css';

const limit = 20;

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const loadPokemons = async (currentSkip = skip) => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/pokemons?skip=${currentSkip}&limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch pokemons');
      const data = await res.json();

      setPokemons(prev => {
        const existingIds = new Set(prev.map(p => p._id));
        const uniqueNew = data.filter(p => !existingIds.has(p._id));
        return [...prev, ...uniqueNew];
      });

      setSkip(currentSkip + limit);

      if (data.length < limit) setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(0);
  }, []);

  const addPokemon = async () => {
    if (!newName.trim()) return alert('Name is required');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/pokemons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) throw new Error('Failed to add pokemon');
      const added = await res.json();
      setPokemons(prev => [added, ...prev]);
      setNewName('');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePokemon = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/pokemons/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete pokemon');
      setPokemons(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-button">
        ⬅ Back to Landing
      </button>

      <h1 className="heading">Pokedex</h1>
      <AddPokemonForm
        newName={newName}
        setNewName={setNewName}
        addPokemon={addPokemon}
        loading={loading}
      />
      {error && <p className="error-text">{error}</p>}
      <PokemonList
        pokemons={pokemons}
        deletePokemon={deletePokemon}
        loading={loading}
        hasMore={hasMore}
        loadMore={() => loadPokemons(skip)}
      />
    </div>
  );
}
