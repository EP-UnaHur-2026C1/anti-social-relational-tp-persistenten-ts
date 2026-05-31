const { Comentario } = require("../db/models")

const getAll = async(_, res) => {
    try{
        const data = await Comentario.findAll({})
        res.status(200).json(data)
    } catch (err){
        res.status(500).json({message: 'No se encontraron comentarios'})
    }   
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await Comentario.findByPk(id)
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({message: 'Comentario no encontrado'})
    }
}

const createComentario = async (req, res) =>{
    try {
        const data = req.body
        const record = await Comentario.create(data)
        res.status(201).json(record) 
    } catch(err){
        res.status(500).json({message: 'Error al crear el comentario'})
    }
}

const updateComentario = async (req, res) =>{
    
}

const deleteComentario = async (req, res) =>{
    
}


module.exports = {getAll, getById, createComentario, updateComentario, deleteComentario};