const { Comentario } = require("../db/models")

const findAll = async(_, res) => {
    const data = await Comentario.findAll({})
    res.status(200).json(data)
}

module.exports = { };