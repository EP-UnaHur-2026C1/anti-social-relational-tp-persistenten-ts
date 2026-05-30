const { Imagen } = require("../db/models")

const getAll = async(_, res) => {
    try{
        const data = await Imagen.findAll({})
        res.status(200).json(data)
    }
    catch (err){
        res.status(500).json({message: 'No se encontraron imágenes'})
    }
    
}

module.exports = {finAll};