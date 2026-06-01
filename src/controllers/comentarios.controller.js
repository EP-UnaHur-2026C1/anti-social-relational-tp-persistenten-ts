const { Comentario } = require("../db/models")

const getAll = async(_, res) => {
    try{
        const comentario = await Comentario.findAll({})
        res.status(200).json(comentario)
    } catch (err){
        res.status(500).json({message: 'No se encontraron comentarios'})
    }   
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const comentario = await Comentario.findByPk(id)
        res.status(200).json(comentario)
    } catch(err){
        res.status(500).json({message: 'Comentario no encontrado'})
    }
}

const createComentario = async (req, res) =>{
    try {
        const data = req.body
        const comentario = await Comentario.create(data)
        res.status(201).json(comentario) 
    } catch(err){
        res.status(500).json({message: 'Error al crear el comentario'})
    }
}

const updateComentario = async (req, res) =>{
    try{
        const id = req.params.id
        const comentario = await Comentario.findByPk(id)
        await comentario.update(req.body)
        res.status(200).json(comentario)
    } catch(err){
        res.status(500).json({message: 'Error al actualizar el comentario'})
    }
}

const deleteComentario = async (req, res) =>{
    try {
        const id = req.params.id
        const comentario = await Comentario.findByPk(id)
        await comentario.destroy()
        res.status(200).json({message: 'Comentario eliminado correctamente'})
    } catch(err) {
        res.status(500).json({message: 'Error al eliminar el comentario'})
    }
}


module.exports = {getAll, getById, createComentario, updateComentario, deleteComentario};