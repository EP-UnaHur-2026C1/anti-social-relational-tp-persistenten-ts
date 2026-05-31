const { User } = require("../db/models")

const getAll = async(_,res) =>{
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los usuarios",})
    }
}

const getById = async(req,res) =>{
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({message: 'Usuario no encontrado'})
    }
}

const createUser = async(req,res) => {
    try{
        const data = req.body
        const user = await User.create(data)
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({message: 'Error al crear el usuario'})
    }
}

const updateUser = async(req,res) => {
    try{
        const id = req.params.id
        const user = await User.findByPk(id)
        await user.update(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({message: 'Error al actualizar el usuario'})
    }
}

const deleteUser = async(req,res) => {
    try{
        const id = req.params.id
        const user = await User.findByPk(id)
        await user.destroy()
        res.status(204).json({message: 'Usuario eliminado'})
    } catch (err) {
        res.status(500).json({message: 'Error al eliminar el usuario'})
    }
}

module.exports = { getAll, getById, createUser, updateUser, deleteUser };