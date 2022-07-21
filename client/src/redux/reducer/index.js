const initialState = {
    pokemons: [],
    backupPokemons: [],
    pokemon: {},
    types: [],
    filtered: [],
    filterActive:{types:"all", createdIn:"all", sortName:"", sortAttack:""} 
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                backupPokemons: action.payload,
                filtered: action.payload
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
            /* let found = state.backupPokemons.filter(p => p.name.toLowerCase() === action.payload.toLowerCase()) */
            return {
                ...state,
                pokemons: action.payload
            }
        case "SORT_BY_NAME": {
            let allPokemons = state.filtered
            let filterActiveLocal = state.filterActive
            filterActiveLocal.sortName = action.payload
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
               pokemons: responseName,
               filterActive: filterActiveLocal.sortName = action.payload
           }  
        }
        case "SORT_BY_ATTACK":{
            const allPokemons = state.filtered
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
                pokemons: responseAttack,
                
            } 
        }
        case "FILTER_BY_TYPE": {
            const pokes = state.backupPokemons.map(e=>e)
            let filterActiveLocal = state.filterActive
            filterActiveLocal.types = action.payload
            const filterType = []
            let responseType = []
            console.log("action.payload",action.payload)
            console.log("filterActiveLocal",filterActiveLocal)

            pokes.forEach(p => {
                if(p.types.includes(action.payload)){
                    filterType.push(p)
                }
            })
            console.log("filtertype",filterType)
            if(action.payload === "all"){
                console.log("all")
                responseType = pokes
            } 
            console.log("responseType1",filterType)
             if(filterActiveLocal.createdIn === "created"){
                console.log("created")
                responseType = filterType.filter(p => p.id.length === 36)
            } else if(filterActiveLocal.createdIn === "existent"){
                console.log("existent")
                responseType = filterType.filter(p => typeof p.id === "number")
            }  

            /* if(filterActiveLocal.createdIn === "created"){
                console.log("created")
                responseType = filterType.filter(e => e.id.length === 36)
            } else if(filterActiveLocal.createdIn === "existent"){
                console.log("existent")
                filterType.map(e => console.log(e.id.length))
                responseType = filterType.filter(e => e.id.length < 36)
            } */
            console.log("responseType2",responseType)

 
            console.log("filterActiveLocal",filterActiveLocal)

            return {
                ...state,
                filterActive: filterActiveLocal,
                pokemons: responseType,
                filtered: responseType
            }
        }
        case "FILTER_BY_CREATION": {
            const allPokes = state.backupPokemons.map(e=>e)
            let filterActiveLocal = state.filterActive
            filterActiveLocal.createdIn = action.payload
            const filterCreated = []
            const filterExistent = []
            let responseCreation = []
            console.log("action.payload", action.payload)
            allPokes.forEach(p => {
                if(typeof p.id === "number"){
                    filterExistent.push(p)
                } else {
                    filterCreated.push(p)
                }
             })

            console.log("filterCreated", filterCreated)
            console.log("filterExistent", filterExistent)
            if(action.payload === "created"){
                responseCreation = filterCreated
            } else if(action.payload === "existent"){
                responseCreation  = filterExistent
            } else if(action.payload === "all"){
                responseCreation = state.backupPokemons
            } 
            console.log("responseCreation",responseCreation)
            if(filterActiveLocal.types !== "all"){
                responseCreation = responseCreation.filter(e=> e.types.includes(filterActiveLocal.types))
            }
            console.log("responseCreation2",responseCreation)
            return {
                ...state,
                filterActive: filterActiveLocal,
                pokemons: responseCreation,
                filtered: responseCreation
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

