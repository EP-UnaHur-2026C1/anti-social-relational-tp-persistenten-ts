const { Imagen } = require("../db/models")

const getAll = async(_, res) => {
    try{
        const data = await Imagen.findAll({})
        res.status(200).json(data)
    } catch (err){
        res.status(500).json({message: 'No se encontraron imágenes'})
    }   
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await Imagen.findByPk(id)
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({message: 'Imagen no encontrada'})
    }
}

const createImagen = async (req, res) =>{
    try {
        const data = req.body
        const record = await Imagen.create(data)
        res.status(201).json(record) 
    } catch(err){
        res.status(500).json({message: 'Error al crear la imagen'})
    }
}

const updateImagen = async (req, res) =>{
    
}

const deleteImagen = async (req, res) =>{
    
}


module.exports = {getAll, getById, createImagen, updateImagen, deleteImagen};