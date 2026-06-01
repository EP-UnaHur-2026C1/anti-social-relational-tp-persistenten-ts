const { Post, Post_Image, Tag, User, Comentario } = require('../db/models');

const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { association: 'Tags' },
        { model: Post_Image, required: false },
        { model: Comentario, required: false },
        { model: User}
      ]
    });
    res.json(posts);
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Error al obtener posts' });
  }
};

const getById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { association: 'Tags' },
        { model: Post_Image },
        { model: Comentario, required: false }
      ]
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({message: `Post ${req.params.id} no encontrado` });
  }
};

const createPost = async (req, res) => {
  try {
    const { descripcion, userId, imagenes, tags } = req.body;

    const post = await Post.create({ descripcion, userId });

    if (imagenes && imagenes.length > 0) {
      const promesasImagenes = imagenes.map((imagen) =>
        Post_Image.create({ URL: imagen.url, postId: post.id })
      );
      await Promise.all(promesasImagenes);
    }

    if (tags && tags.length > 0) {
      await post.addTags(tags);
    }

    const postCompleto = await Post.findByPk(post.id, {
      include: [{ association: 'Tags' }, { model: Post_Image }]
    });

    res.status(201).json(postCompleto);
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Error al crear post' });
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    await post.update(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({message: 'Error al modificar post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({message: 'Error al eliminar post'});
  }
};

const addImage = async (req, res) => {
  try {
    const imagen = await Post_Image.create({ URL: req.body.URL, postId: req.params.id });
    res.status(201).json(imagen);
  } catch (err) {
    res.status(500).json({ message: 'Error al añadir imagen' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const imagen = await Post_Image.findByPk(req.params.imgId);
    if (!imagen) return res.status(404).json({ error: 'Imagen no encontrada' });
    await imagen.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar imagen' });
  }
};

const getComentarios = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: [{ model: Comentario, required: false }]
    });
    const visibles = post.Comentarios.filter(c => c.estaVisible);
    /*Se filtra de esta forma y no con un where porque el atributo estaVisible es virtual,
    no existe en la base de datos, sino que se calcula a partir de la fecha de publicacion*/
    res.json(visibles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};

const addComentario = async (req, res) => {
  try {
    const {descripcion, userId} = req.body;
    const comentario = await Comentario.create({
      descripcion: descripcion,
      userId: userId,
      postId: req.params.id
    });
    res.status(201).json(comentario);
  } catch (err) {
    res.status(500).json({ message: 'Error al añadir comentario' });
  }
};

const deleteComentario = async (req, res) => {
  try {
    await req.comentario.destroy();
    res.status(204).json({message: 'Comentario eliminado'});
  } catch (err) {
    res.status(500).json({message: "Error al eliminar comentario"});
  }
};

module.exports = { getAll, getById, createPost, updatePost, deletePost, addImage, deleteImage, getComentarios, addComentario, deleteComentario };