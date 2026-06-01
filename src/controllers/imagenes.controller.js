const { Post_Image } = require("../db/models")

const getAll = async(_, res) => {
    try{
        const imagen = await Post_Image.findAll({})
        res.status(200).json(imagen)
    } catch (err){
        res.status(500).json({message: 'No se encontraron imágenes'})
    }   
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const imagen = await Post_Image.findByPk(id)
        res.status(200).json(imagen)
    } catch(err){
        res.status(500).json({message: 'Imagen no encontrada'})
    }
}

const createImagen = async (req, res) =>{
    try {
        const data = req.body
        const imagen = await Post_Image.create(data)
        res.status(201).json(imagen) 
    } catch(err){
        res.status(500).json({message: 'Error al crear la imagen'})
    }
}

const updateImagen = async (req, res) =>{
    try{
        const id = req.params.id
        const imagen = await Post_Image.findByPk(id)
        await imagen.update(req.body)
        res.status(200).json(imagen)
    } catch(err){
        res.status(500).json({message: 'Error al actualizar la imagen'})
    }
}

const deleteImagen = async (req, res) =>{
    try {
        const id = req.params.id
        const imagen = await Post_Image.findByPk(id)
        await imagen.destroy()
        res.status(200).json({message: 'Imagen eliminada correctamente'})
    } catch(err) {
        res.status(500).json({message: 'Error al eliminar la imagen'})
    }
}


module.exports = {getAll, getById, createImagen, updateImagen, deleteImagen};