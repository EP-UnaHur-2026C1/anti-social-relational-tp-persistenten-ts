const { Comentario } = require('../db/models');
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

const verificarComentarioPerteneceAlPost = async (req, res, next) => {
  const comentario = await Comentario.findByPk(req.params.comentarioId);

  if (comentario.postId !== Number(req.params.id)) {
    return res.status(400).json({
      error: 'El comentario no pertenece al post indicado'
    });
  }

  next();
};

module.exports = {
  validarComentarioById,
  validarComentarioSchema,
  verificarComentarioPerteneceAlPost
};