const joi = require('joi');

const postSchema = joi.object({
  descripcion: joi.string().max(1000).required().messages({
    'string.empty': 'La descripción del post no puede estar vacía',
    'string.max': 'La descripción no puede superar los 1000 caracteres',
    'any.required': 'La descripción es requerida',
  }),

  fechaPublicacion: joi.date().iso().required().messages({
    'date.base': 'La fecha de publicación debe ser una fecha válida',
    'date.format': 'La fecha debe cumplir con el formato ISO',
    'any.required': 'La fecha de publicación es requerida',
  }),

  userId: joi.number().integer().required().messages({
    'number.base': 'El ID de usuario debe ser un número',
    'any.required': 'El ID de usuario es obligatorio para publicar',
  }),

  tags: joi.array().items(joi.number().integer()).messages({
    'array.base': 'Los tags deben venir en formato de lista (array)',
  }),

  imagenes: joi.array()
    .items(
      joi.object({
        url: joi.string().uri().required().messages({
          'string.empty': 'La URL de la imagen no puede estar vacía',
          'string.uri': 'Cada imagen debe tener una URL válida',
          'any.required': 'La URL de la imagen es requerida'
        })
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Las imágenes deben venir en formato de lista (array)',
      'array.min': 'El post debe contener al menos {#limit} imagen',
      'any.required': 'Las imágenes son requeridas'
    })
});

module.exports = postSchema;