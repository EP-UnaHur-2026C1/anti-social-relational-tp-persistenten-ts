const { Post } = require("../db/models")

const getAll = async(_, res) => {
    const data = await Post.findAll({})
    res.status(200).json(data)
}

module.exports = { };