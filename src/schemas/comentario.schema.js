const joi = require('joi');

const comentarioSchema = joi.object({
  descripcion: joi.string().min(2).max(500).required().messages({
    'string.empty': 'El comentario no puede ser vacío',
    'string.min': 'El comentario debe tener un mínimo de 2 caracteres',
    'string.max': 'El comentario debe tener un máximo de 500 caracteres',
    'any.required': 'El comentario es requerido',
  }),
   userId: joi.number().integer().required().messages({
    'number.base': 'El ID de usuario debe ser un número',
    'any.required': 'El ID de usuario es obligatorio'
  })
});

module.exports = comentarioSchema;