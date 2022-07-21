import axios from "axios"

/* export function getPokemons(){
    return async function(dispatch){
        let pokemons = await axios.get("http://localhost:3001/pokemons")
        return dispatch({type:"GET_POKEMONS", payload: pokemons.data})
    }
} */

export const getPokemons = () => {
    return async function(dispatch){
        let pokemons = await axios.get("http://localhost:3001/pokemons")
        return dispatch({type:"GET_POKEMONS", payload: pokemons.data})
    }
}


export const getTypes = () => {
    return async function(dispatch){
        let types = await axios.get("http://localhost:3001/types")
        return dispatch({type: "GET_TYPES", payload: types.data})
    }
}

/* export const getTypes = () => {
    return {
        let types = axios.get("http://localhost:3001/types")
        .then(dispatch({type: "GET_TYPES", payload: types}))
    }
} */

/* export const getById = (id) => dispatch => {
    return fetch(`http://localhost:3001/pokemons/${id}`)
    .then(response => response.json())
    .then(pokemon => dispatch({type: "GET_BY_ID", payload: pokemon}))
} */

export const getById = (id) => {
    return async function(dispatch){
        let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({type: "GET_BY_ID", payload: pokemon.data})
    }
}

export const createPokemon = (payload) => {
    return async function(dispatch){
        let newPokemon = await axios.post("http://localhost:3001/pokemons", payload)
        return dispatch({type:"CREATE_POKEMON", newPokemon})
    }
}

export const searchByName = (name) => {
    return async function(dispatch){
        let pokeName = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
        return dispatch({type: "SEARCH_BY_NAME", payload: pokeName.data})
    }
}

export const sortByName = (payload) => {
    return {
        type: "SORT_BY_NAME", payload
    }
}

export const sortByAttack = (payload) => {
    return {
        type: "SORT_BY_ATTACK", payload
    }
}

export const filterByType = (payload) => {
    return {
        type: "FILTER_BY_TYPE", payload
    }
}

export const filterByCreation = (payload) => {
    return {
        type: "FILTER_BY_CREATION", payload
    }
}

export const resetPokemons = () => {
    return {
        type: "RESET_POKEMONS"
    }
}
