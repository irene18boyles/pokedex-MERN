import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pokeId: {
        type: Number,
        unique: true,
    },
    url: {
        type: String
    }
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

export default Pokemon