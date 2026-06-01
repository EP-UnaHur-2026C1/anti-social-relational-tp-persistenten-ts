const {Tag} = require('../db/models')
const {validarById} = require('./generic.middleware')
const tagSchema = require('../schemas/tag.schema')
const genericSchemaValidator = require('../schemas/genericSchemaValidator')

const validarTagById = validarById(Tag)

const validarTagSchema = (req,res,next) => {
    const {error, _} = genericSchemaValidator(tagSchema, req.body)
    if (error){
        res.status(400).json({
            errores: error.details.map((e)=>{
                return{
                    atributo: e.path.join('.'),
                    detalle: e.message
                }
            })
        })
        return       
    }
    next()
}

module.exports = {validarTagById, validarTagSchema}

