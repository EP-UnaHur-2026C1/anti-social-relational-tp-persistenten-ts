const joi = require('joi');

const userSchema = joi.object({
  nickName: joi.string().min(3).max(30).required().messages({
    'string.empty': 'El nickName no puede ser vacío',
    'string.min': 'El nickName debe tener un mínimo de 3 caracteres',
    'string.max': 'El nickName debe tener un máximo de 30 caracteres',
    'any.required': 'El nickName es requerido',
  }),
});

module.exports = userSchema;