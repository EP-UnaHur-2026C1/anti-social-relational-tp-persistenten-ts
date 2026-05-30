const joi = require('joi');

const tagSchema = joi.object({
  descripcion: joi.string().min(2).max(50).required().messages({
    'string.empty': 'La descripción no puede ser vacía',
    'string.min': 'La descripción debe tener un mínimo de 2 caracteres',
    'string.max': 'La descripción debe tener un máximo de 50 caracteres',
    'any.required': 'La descripción es requerida',
  }),
});

module.exports = tagSchema;