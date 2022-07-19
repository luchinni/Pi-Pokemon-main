// GET POKEMONS
// GET POKEMON
// POST POKEMON
// SEARCH BY NAME
// FILTER ATTACK
// FILTER API O DB
// ORDER AZ ZA
// ORDER TYPE
import axios from "axios"

export function getPokemons(){
    return async function(dispatch){
        let pokemons = await axios.get("http://localhost:3001/pokemons")
        return dispatch({type:"GET_POKEMONS", payload: pokemons.data})
    }
}

export function getTypes(){
    return async function(dispatch){
        let types = await axios.get("http://localhost:3001/types")
        return dispatch({type: "GET_TYPES", payload: types})
    }
}

export function getByName(name){
    return async function(dispatch){
        let pokeName = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
        return dispatch({type: "GET_BY_NAME", payload: pokeName})
    }
}

/* export const getByName = (name) => dispatch => {
    return fetch(`http://localhost:3001/pokemons/?name=${name}`)
    .then(response => response.json())
    .then(pokemon => dispatch({type: "GET_BY_NAME", payload: pokemon}))
} */

export const createPokemon = (payload) => {
    return async function(dispatch){
        let newPokemon = await axios.post("http://localhost:3001/pokemons", payload)
        return dispatch({type:"CREATE_POKEMON", newPokemon})
    }
}

export const getById = (id) => dispatch => {
    return fetch(`http://localhost:3001/pokemons/${id}`)
    .then(response => response.json())
    .then(pokemon => dispatch({type: "GET_BY_ID", payload: pokemon}))
}

export function searchByName(input){
    return {type: "SEARCH_BY_NAME", payload: input}
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

export const resetPokemons = () => {
    return {
        type: "RESET_POKEMONS"
    }
}
/* export const orderAz = (pokemons) => dispatch => {
    const orderAz = pokemons.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
    })
    dispatch({type: "ORDER_AZ", payload: orderAz})
}

export const orderZa = (pokemons) => dispatch => {
    const orderZa = pokemons.sort((a, b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
        if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
        return 0
    })
    dispatch({type: "ORDER_ZA", payload: orderZa})
} */

/* export const orderMinAttack = (pokemons) => dispatch => {
    const orderMinAttack = pokemons.sort((a, b) => {
        return a.attack - b.attack
    })
    dispatch({type: "ORDER_MIN_ATTACK", payload: orderMinAttack})
}

export const orderMaxAttack = (pokemons) => dispatch => {
    const orderMaxAttack = pokemons.sort((a, b) => {
        return b.attack - a.attack
    })
    dispatch({type: "ORDER_MAX_ATTACK", payload: orderMaxAttack})
} */