const initialState = {
    pokemons: [],
    backupPokemons: [],
    pokemon: {},
    types: [],
    filterActive:{types:"all", createdIn:"all"}
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                backupPokemons: action.payload
            }
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }
        case "GET_BY_ID":
            return {
                ...state,
                pokemon: action.payload
            }
        case "GET_BY_NAME":
            return {
                ...state,
                pokemon: action.payload
            }
        case "CREATE_POKEMON":
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case "SEARCH_BY_NAME":
            let found = state.backupPokemons.filter(p => p.name.toLowerCase() === action.payload.toLowerCase())
            return {
                ...state,
                pokemons: found
            }
        case "SORT_BY_NAME": {
            let allPokemons = state.pokemons
            let responseName = []
            if(action.payload === "a-z"){
                responseName = allPokemons.sort((a, b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })
            } else if(action.payload === "z-a"){
                responseName = allPokemons.sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                })
            } return {
               ...state,
               pokemons: responseName
           } 
        }
        case "SORT_BY_ATTACK":{
            const allPokemons = state.pokemons 
            let responseAttack = []
            
            if(action.payload === "min"){
                responseAttack = allPokemons.sort((a, b) => {
                return a.attack - b.attack
                })
            } else if(action.payload === "max"){
                responseAttack = allPokemons.sort((a, b) => {
                    return b.attack - a.attack
                })
            } return {
                ...state,
                pokemons: responseAttack
            }
        }
        case "FILTER_BY_TYPE": {
            const pokes = state.pokemons
            let filterActiveLocal = state.filterActive
            filterActiveLocal.types = action.payload
            const filterType = []
            let responseType = []
            
            pokes.forEach(p => {
                if(p.types.includes(action.payload)){
                    filterType.push(p)
                }
            })

            if(filterType.length > 0) {
                responseType = filterType
            } else if(action.payload === "all"){
                responseType = state.backupPokemons  
            } 

            if(filterActiveLocal.createdIn === "created"){
                responseType = responseType.filter(e => e.id.length === 36)
            } else if(filterActiveLocal.createdIn === "existent"){
                responseType = responseType.filter(e => e.id.length < 36)
            }
            
            return {
                ...state,
                filterActive: filterActiveLocal,
                pokemons: responseType
            }
        }
        case "FILTER_BY_CREATION":{
            const allPokes = state.backupPokemons
            let filterActiveLocal = state.filterActive
            filterActiveLocal.createdIn = action.payload
            const filterCreated = []
            const filterExistent = []
            let responseCreation = []

            allPokes.forEach(p => {
                if(p.id.length === 36){
                    filterCreated.push(p)
                } else {
                    filterExistent.push(p)
                }
            })
            if(action.payload === "created" && filterCreated.length > 0){
                responseCreation  = filterCreated
            } else if(action.payload === "existent" && filterExistent.length > 0){
                responseCreation  = filterExistent
            } else if(action.payload === "all"){
                responseCreation = state.backupPokemons
            } 
            
            if(filterActiveLocal.types !== "all"){
                responseCreation = responseCreation.filter(e=> e.types.includes(filterActiveLocal.types))
            }
            
            return {
                ...state,
                filterActive: filterActiveLocal,
                pokemons: responseCreation
            }
        }
        case "RESET_POKEMONS": 
            return {
                ...state,
                pokemons: state.backupPokemons,
                filterActive: {types:"all", createdIn:"all"}
            }
        default: return state
    }
}


export default reducer;

