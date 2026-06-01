const { Comentario, User, Post } = require('../db/models');
const { validarById } = require('./generic.middleware');
const comentarioSchema = require('../schemas/comentario.schema');
const genericSchemaValidator = require('../schemas/genericSchemaValidator');

const validarComentarioById = validarById(Comentario);

const validarComentarioSchema = (req, res, next) => {
  const { error } = genericSchemaValidator(comentarioSchema, req.body);

  if (error) {
    return res.status(400).json({
      errores: error.details.map((e) => ({
        atributo: e.path.join('.'),
        detalle: e.message,
      })),
    });
  }
  next();
};

// Verifica no se comente un post que no exista o que sea un usuario falso
const verificarRelacionesComentario = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    
    if (userId) {
      const userExits = await User.findByPk(userId);
      if (!userExits) return res.status(404).json({ error: `El userId ${userId} no existe` });
    }
    
    if (postId) {
      const postExists = await Post.findByPk(postId);
      if (!postExists) return res.status(404).json({ error: `El postId ${postId} no existe` });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  validarComentarioById,
  validarComentarioSchema,
  verificarRelacionesComentario,
};