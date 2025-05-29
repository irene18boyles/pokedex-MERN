export default function AddPokemonForm({ newName, setNewName, addPokemon, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addPokemon();
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        placeholder="New Pokemon Name"
        value={newName}
        onChange={e => setNewName(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="input"
      />
      <button
        onClick={addPokemon}
        disabled={loading || !newName.trim()}
        className="button"
      >
        Add Pokemon
      </button>
    </div>
  );
}
