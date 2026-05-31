const { Tag } = require("../db/models")

const getAll = async (_,res) => {
    try {
        const tags = await Tag.findAll()
        res.status(200).json(tags)
    } catch (err){
        res.status(500).json({message: 'No se encontraron tags'})
    }
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        res.status(200).json(tag)
    } catch(err){
        res.status(500).json({message: 'Tag no encontrado'})
    }
}

const createTag = async(req,res) => {
    try {
        const {descripcion} = req.body
        const tag = await Tag.create({descripcion})
        res.status(201).json(tag) 
    } catch(err){
        res.status(500).json({message: 'Error al crear el tag'})
    }
}

const updateTag = async(req,res) =>{
    try{
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        await tag.update(req.body)
        res.status(200).json(tag)
    } catch(err){
        res.status(500).json({message: 'Error al actualizar el tag'})
    }
}

const deleteTag = async(req,res) =>{
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        await tag.destroy()
        res.status(200).json({message: 'Tag eliminado correctamente'})
    } catch(err) {
        res.status(500).json({message: 'Error al eliminar el tag'})
    }
}

module.exports = {getAll, getById,createTag,updateTag,deleteTag };