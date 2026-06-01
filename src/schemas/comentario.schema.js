const joi = require('joi');

const comentarioSchema = joi.object({
  comentario: joi.string().min(1).max(500).required().messages({
    'string.empty': 'El comentario no puede ser vacío',
    'string.min': 'El comentario debe tener un mínimo de 3 caracteres',
    'string.max': 'El comentario debe tener un máximo de 500 caracteres',
    'any.required': 'El comentario es requerido',
  }),
});

module.exports = comentarioSchema;