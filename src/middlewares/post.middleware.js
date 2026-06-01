const { Post, User } = require('../db/models');
const { validarById } = require('./generic.middleware');
const postSchema = require('../schemas/post.schema');
const genericSchemaValidator = require('../schemas/genericSchemaValidator');

const validarPostById = validarById(Post);

const validarPostSchema = (req, res, next) => {
  const { error } = genericSchemaValidator(postSchema, req.body);
  
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

// Verifica que sea un usuario existente
const verificarUsuarioExistente = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const usuario = await User.findByPk(userId);
    
    if (!usuario) {
      return res.status(404).json({ error: `El userId ${userId} no corresponde a un usuario existente` });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  validarPostById,
  validarPostSchema,
  verificarUsuarioExistente,
};