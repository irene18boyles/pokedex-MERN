import express from "express";
import { getPokemons, addPokemon, updatePokemon, deletePokemon, } from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/", getPokemons);
router.post("/", addPokemon);
router.put("/:id", updatePokemon);
router.delete("/:id", deletePokemon);

export default router;
