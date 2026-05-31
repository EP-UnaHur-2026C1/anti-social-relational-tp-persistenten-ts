const { Post, Imagen, Tag } = require("../db/models")

const getAll = async(_, res) => {
    try{
        const data = await Post.findAll({})
        res.status(200).json(data)
    } catch (err){
        res.status(500).json({message: 'No se encontraron posts'})
    }   
}

const getById = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await Post.findByPk(id)
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({message: 'Post no encontrado'})
    }
}

const createPost = async (req, res) =>{
    try {
        const data = req.body
        const record = await Post.create(data)
        res.status(201).json(record) 
    } catch(err){
        res.status(500).json({message: 'Error al crear el post'})
    }
}

const createPostImagenTag = async (req, res) =>{ 
    const data = req.body
    const post = await Post.create({
        descripcion: data.descripcion
    })
    
    const promesas = []
    data.imagenes.forEach((i) => {
        promesas.push(Imagen.create(i))
    })

    // también se podría hacer que busque si existe la imagen para asociarla y sino la crea

    // data.imagenes.forEach((i) => {
    //     promesas.push(Imagen.findOrCreate({
    //          where: {id: {[Op.eq]: i.id}},
    //          defaults: i
    //     }))
    // })

    // result = await Promise.all(promesas)
    // const imagenesYTags = result.map(([imagenTag]) => imagenTag)
    // await post.addImagenesTags(imagenesYTags)

    data.tags.forEach((t) => {
        promesas.push(Tag.create(t))
    })

    result = await Promise.all(promesas)

    await post.addImagenesTags(result)

    res.status(201).json({...post.dataValues, imagenes: await post.getImagenes({joinTableAttributes: []}), tags: await post.getTags({joinTableAttributes: []})}) 
}

const updatePost = async (req, res) =>{
    
}

const deletePost = async (req, res) =>{
    
}

const getWithImagenesById = async (req, res) =>{
    try {
        const id = req.params.id
        const data = await Post.finOne({
            where: {id}, 
            include: [{
                model: Imagen,
                as: "imagenes",
                through: {
                    attributes: [],
                }
            }]
        })
    }catch(err){
        res.status(500).json({message: 'Imagen no encontrada en el post'}) // ---
    }
}

module.exports = {getAll, getById, createPost, createPostImagenTag, updatePost, deletePost, getWithImagenesById};