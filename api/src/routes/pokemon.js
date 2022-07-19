const { Router } = require("express");
const { getPokemons, getPokemonById, createPokemon } = require("../controllers/pokemon_controller");
const router = Router();

router.get("/", getPokemons)
router.get("/:id", getPokemonById)
router.post("/", createPokemon)



module.exports = router;