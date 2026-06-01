const { Imagen } = require('../db/models'); // Asegurate de que se llame así en tus modelos de Sequelize
const { validarById } = require('./generic.middleware');
const imagenSchema = require('../schemas/imagen.schema');
const genericSchemaValidator = require('../schemas/genericSchemaValidator');

const validarImagenById = validarById(Imagen);

const validarImagenSchema = (req, res, next) => {
  const { error } = genericSchemaValidator(imagenSchema, req.body);

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

module.exports = {
  validarImagenById,
  validarImagenSchema,
};