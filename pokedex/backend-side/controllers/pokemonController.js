import Pokemon from "../models/pokemonModel.js";
import fetch from "node-fetch";

export const getPokemons = async (req, res) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 20;

  try {
    const count = await Pokemon.countDocuments();

    if (count < skip + limit) {
      const offset = count;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      if (!response.ok) return res.status(500).json({ message: "Failed to fetch from PokeAPI" });

      const data = await response.json();
      const newPokemons = data.results.map((p, index) => ({
        name: p.name,
        pokeId: offset + index + 1,
      }));

      const existingPokeIds = new Set(
        (await Pokemon.find({ pokeId: { $in: newPokemons.map(np => np.pokeId) } })).map(p => p.pokeId)
      );

      const filteredNewPokemons = newPokemons.filter(np => !existingPokeIds.has(np.pokeId));
      if (filteredNewPokemons.length > 0) {
        await Pokemon.insertMany(filteredNewPokemons);
      }
    }

    const pokemons = await Pokemon.find().skip(skip).limit(limit);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPokemon = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) return res.status(404).json({ message: "Pokemon not found in PokeAPI" });

    const pokeData = await response.json();
    const pokeId = pokeData.id;

    const existing = await Pokemon.findOne({ pokeId });
    if (existing) return res.status(400).json({ message: "Pokemon already exists" });

    const newPokemon = new Pokemon({ name, pokeId });
    await newPokemon.save();

    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedPokemon = await Pokemon.findByIdAndUpdate(id, update, { new: true });
    if (!updatedPokemon) return res.status(404).json({ message: "Pokemon not found" });
    res.status(200).json(updatedPokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePokemon = async (req, res) => {
  try {
    const deleted = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Pokemon not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
