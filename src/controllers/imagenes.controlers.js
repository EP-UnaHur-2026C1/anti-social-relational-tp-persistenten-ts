const { Imagen } = require("../db/models")

const findAll = async(_, res) => {
    const data = await Imagen.findAll({})
    res.status(200).json(data)
}

module.exports = {finAll};