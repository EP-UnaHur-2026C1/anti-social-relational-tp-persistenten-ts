const { Tag } = require("../db/models")

const getAll = async (_,res) => {
    try {
        const tags = await Tag.findAll()
        res.json(tags)
    } catch (err){
        res.status(500).json({message: 'No se encontraron tags'})
    }
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        res.json(tag)
    } catch(err){
        res.status(500).json(err.message)
    }
}

const createTag = async(req,res) => {
    try {
        const {descripcion} = req.body
        const tag = await Tag.create({descripcion})
        res.status(201).json(tag) 
    } catch(err){
        res.status(500).json(err.message)
    }
}

const updateTag = async(req,res) =>{
    try{
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        await tag.update(req.body)
        res.status(200).json(tag)
    } catch(err){
        res.status(500).json(err.message)
    }
}

const deleteTag = async(req,res) =>{
    try {
        const id = req.params.id
        const tag = await tag.findByPk(id)
        await tag.destroy()
        res.status(200).json({message: 'Tag eliminado correctamente'})
    } catch(err) {
        res.status(500).json(err.message)
    }
}

module.exports = {getAll, getById,createTag,updateTag,deleteTag };