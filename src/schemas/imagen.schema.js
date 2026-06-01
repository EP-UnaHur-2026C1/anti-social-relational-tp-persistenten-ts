const joi = require('joi');

const imagenSchema = joi.object({
  
    url: joi.string().uri().required().messages({
        'string.empty': 'La URL de la imagen no puede estar vacia',
        'string.uri': 'La URL de la imagen debe tener un formato valido (http://...)',
        'any.required' : 'La URL de la imagen es requerida'
    }),  
});

module.exports = imagenSchema;