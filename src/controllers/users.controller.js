const { User } = require("../db/models")
const user = require("../db/models/user")

const getAll = async(_,res) =>{
    try {
        const users = await User.findAll({
            include: [{
                association: 'seguidores',
                through: {attributes: []}
            },
            {
                association: 'siguiendo',
                through: {attributes: []}
            }
        ]
        })
        
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los usuarios",})
    }
}

const getById = async(req,res) =>{
    try {
        const id = req.params.id
        const user = await User.findByPk(id, {
            include: [{
                association: 'seguidores',
                through: {attributes: []}
            },
            {
            association: 'siguiendo',
            through: {attributes: []}
            }]
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: 'Usuario no encontrado'})
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

const seguirUser = async(req, res) =>{
    try {   
        const {id, otroId} = req.params;
        const user = await User.findByPk(id);
        const otroUser = await User.findByPk(otroId);

        await user.addSiguiendo(otroUser); // esto agrega agrega otroUser a los seguidos de user
        res.status(201).json({message: `El usuario ${user.nickName} empezó a seguir a ${otroUser.nickName}`});
        // Para seguir a usuarios con este metodo, en postman ponemos simplemente, en el put, algo como "users/1/seguidores/2" SIN BODY para que el user 1 siga al user2
    } catch (err) {
        res.status(404).json({message: 'Usuario no encontrado'});
    }
}

const dejarDeSeguirUser = async (req, res) => { // De igual manera que el anterior, ponemos algo como "users/1/seguidores/2" sin body en el delete
    try {
        const {id, otroId} = req.params;
        const user = await User.findByPk(id);
        const otroUser = await User.findByPk(otroId);

        await user.removeSiguiendo(otroUser);
        res.status(200).json({message: `El usuario ${user.nickName} dejó de seguir a ${otroUser.nickName}`,});
    } catch (err) {
        res.status(404).json({message: 'Usuario no encontrado'})
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

module.exports = { getAll, getById, createUser, seguirUser, updateUser, deleteUser, dejarDeSeguirUser };