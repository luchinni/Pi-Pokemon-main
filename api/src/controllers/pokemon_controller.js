const { Pokemon, Types } = require("../db");
const { uuid } = require("uuidv4");
const axios = require("axios");

const getPokemons = async (req, res) => {
    try {
        // accedo a la api, del objeto que llega hago una subrequest a su propiedad url que es un link y tiene toda la data, y me traigo la que necesito
        const apiResponse =  await Promise.all([axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")])
        
        const pokemons = apiResponse[0].data.results.map((pokemon) => {
            return axios.get(pokemon.url)
              .then((p) => {
                    return{
                        id: p.data.id,
                        name: p.data.name,
                        image: p.data.sprites.other.dream_world.front_default,
                        types: p.data.types.map((t) => {
                            let types = t.type.name
                            return(types)
                            }),
                        hp: p.data.stats[0].base_stat,
                        attack: p.data.stats[1].base_stat,
                        defense: p.data.stats[2].base_stat,
                        speed: p.data.stats[5].base_stat,
                        height: p.data.height,
                        weight: p.data.weight 
                    }
                })
              .catch((err) => console.log(err));
          });
        
        const pokemonsApi = await Promise.all(pokemons);
        
        // me traigo todos los pokemons de mi db, accedo al dataValues para mapear las types primero, y después me traigo el resto de la info que necesito
        const pokemonsDb = await Pokemon.findAll({
            include: {
              model: Types,
                attributes: {
                  include: ['name'], 
                  exclude:['createdAt', 'updatedAt']
                },
                through: {
                  attributes:[]
                }  
            }
          })
        let pokemonsDbOk = pokemonsDb.map(pokemon =>{
            console.log("pokemon",pokemon.dataValues.types)
            let types= pokemon.dataValues.types.map((e)=> e.dataValues.name)
            console.log("types", types) 
            
           return{
                id: pokemon.dataValues.id,
                name: pokemon.dataValues.name,
                image: pokemon.dataValues.image,
                types: types,
                hp: pokemon.dataValues.hp,
                attack: pokemon.dataValues.attack,
                defense: pokemon.dataValues.defense,
                speed: pokemon.dataValues.speed,
                height: pokemon.dataValues.height,
                weight: pokemon.dataValues.weight
            } 
        })

        // junto los pokemons y su info tanto de la api como de la db en un solo array allPokemons
        const allPokemons = await pokemonsApi.concat(pokemonsDbOk)

        // hago la búsqueda por el nombre que recibo por query, como es búsqueda exacta, hago un find. 
        // si lo encuentra, lo devuelvo como un array con el objeto porque mi "front" espera un array y no un objeto, y sino, devuelvo un array vacio por lo mismo
        // si no me pasan un name, entonces devuelvo todos los pokemons
        const { name } = req.query
        if(name){
            let getByName = allPokemons.find((n) => (n.name.toLowerCase() === name.toLowerCase()))
            console.log("get by name trae esto", getByName) 
            if(getByName){
                res.json([getByName])
            } else {
                res.json([])

                } 
            } else {
            res.json(allPokemons)
            }
        } catch (err) {
        console.log(err)
    }
}



const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params

        // como uso uuid que siempre tiene 36 caracteres para los pokemons creados, uso el id.length para diferenciar si voy a buscar en la api o en la db
        if(id.length < 36){
            const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemon = apiResponse.data
            const pokemonFound = {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types.map((t) => {
                    let types = t.type.name
                    return(types)
                }),
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height,
                weight: pokemon.weight,
            }
            res.json(pokemonFound)
        } else {
            const pokemonCreated = await Pokemon.findByPk(id, {include:Types})
            const pokemonFound = {
                id: pokemonCreated.id,
                name: pokemonCreated.name,
                image: pokemonCreated.image,
                types: pokemonCreated.dataValues.types?.map((t) => {
                    let types = t.name
                    return(types)
                }),
                hp: pokemonCreated.hp,
                attack: pokemonCreated.attack,
                defense: pokemonCreated.defense,
                speed: pokemonCreated.speed,
                height: pokemonCreated.height,
                weight: pokemonCreated.weight,
            }
             res.json(pokemonFound)
        }
    } catch (err) {
        console.log(err)
    }
}



const createPokemon = async (req, res) => {
    const { image, name, types, hp, attack, defense, speed, height, weight} = req.body

    // para crear el pokemon en la db, toda la info que viene por body se la asigno al pokemon que estoy creando, y los tipos que me manden los traigo de mi db por id desde el front
    try {
        let newPokemon = await Pokemon.create({
            id: uuid(),
            image: image,
            name: name,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight
        })

        await newPokemon.addTypes(types)

        res.send({msg: "Pokemon created succesfully"})

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getPokemons,
    getPokemonById,
    createPokemon
}