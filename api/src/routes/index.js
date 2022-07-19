const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const Pokemon = require("./pokemon.js");
const Types = require("./types");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", Pokemon)
router.use("/types", Types)


module.exports = router;
