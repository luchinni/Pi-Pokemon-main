const { Types } = require("../db");
const { uuid } = require("uuidv4");
const axios = require("axios");

const getAllTypes = async (req, res) => {
    const allData = await Types.findAll()
    // si la base tiene algo que lo devuelva, sino que vaya a la api y lo pida y lo guarde en la db
    try {
        if(allData.length === 0){
        const types = await axios.get("https://pokeapi.co/api/v2/type")
        const typeApi = types.data.results

        console.log("type api", typeApi)

        //mando a la db todos los tipos que me vienen por api, les asigno un id porque me obliga el modelo.

        typeApi.forEach((t) => {
            t.id = uuid()
            console.log(t)
            Types.findOrCreate({
                where: {id:t.id, name: t.name}
            })
        })
        const allTypes = await Types.findAll()
        console.log("all types", allTypes)
        res.send(allTypes) 
        } else {
            res.send(allData)
        }

    } catch (err) {
        console.log(err)
    }

}



module.exports = {
    getAllTypes
}