const initialState = {
    pokemons: [],
    backupPokemons: [],
    pokemon: {},
    types: [],
    filtered: [],
    filterActive:{types:"all", createdIn:"all", sort: ""}
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                backupPokemons: action.payload,
                filtered: action.payload,
                filterActive: {types: "all", createdIn: "all", sort: ""}
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
        case "CREATE_POKEMON":
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case "SEARCH_BY_NAME":
            return {
                ...state,
                pokemons: action.payload
            }
        case "SORT_BY_NAME": {
            let pokeName = state.pokemons
            let filterActiveLocal = state.filterActive
            let responseName = []
            
            if(action.payload === "a-z"){
                responseName = pokeName.sort((a, b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })
            } else if(action.payload === "z-a"){
                responseName = pokeName.sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                })
            
                
            } 

            filterActiveLocal.sort = action.payload
            return {
               ...state,
               pokemons: responseName,
               filterActive: filterActiveLocal
           }  
        }
        case "SORT_BY_ATTACK":{
            let pokeAttack = state.pokemons
            let filterActiveLocal = state.filterActive
            let responseAttack = []
            
            if(action.payload === "min"){
                responseAttack = pokeAttack.sort((a, b) => {
                return a.attack - b.attack
                })
            } else if(action.payload === "max"){
                responseAttack = pokeAttack.sort((a, b) => {
                    return b.attack - a.attack
                })
            } 
            filterActiveLocal.sort = action.payload
            
            
            return {
                ...state,
                pokemons: responseAttack,
                filterActive: filterActiveLocal  
            } 
        }
        case "FILTER_BY_TYPE": 
            let pokeTypes = state.filtered
            let filterActiveLocal = state.filterActive
            let filteredTypes = action.payload === "all" ?
                pokeTypes : pokeTypes.filter((p) => p.types.includes(action.payload))

            if(filterActiveLocal.createdIn === "created"){
                console.log("created")
                filteredTypes = filteredTypes.filter(p => p.id.length === 36)
            } else if(filterActiveLocal.createdIn === "existent"){
                console.log("existent")
                filteredTypes = filteredTypes.filter(p => typeof p.id === "number")
            }
            
            return {
                ...state,
                pokemons: filteredTypes,
                filterActive: {...state.filterActive, types : action.payload}
            }

            
        case "FILTER_BY_CREATION": {
            let pokeCreated = state.filtered
            let filterActiveLocal = state.filterActive
            let filterCreated 
            if(action.payload && action.payload !== "all"){
                filterCreated = action.payload === "existent" ?
                pokeCreated.filter((p) => typeof p.id === "number") :
                pokeCreated.filter((p) => typeof p.id !== "number") 
            } else {
                filterCreated = pokeCreated
            }

            if(filterActiveLocal.types !== "all"){
                filterCreated = filterCreated.filter(e=> e.types.includes(filterActiveLocal.types))
            } 

            return {
                ...state,
                pokemons: filterCreated,
                filterActive: {...state.filterActive, createdIn : action.payload}
            }
        }
        
        case "RESET_POKEMONS": 
            return {
                ...state,
                pokemons: state.backupPokemons,
                filterActive: {types:"all", createdIn:"all", sort:""}
            }
        default: return state
    }
}


export default reducer;

