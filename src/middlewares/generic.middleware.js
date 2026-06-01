const validarById = (modelo) =>{
    return async (req,res,next) =>{
        const id = req.params.id
        const instancia = await modelo.findByPk(id)
        if (!instancia){
            res.status(404).json({err_message: `El ${id} no fue encontrado`})
            return
        }
        next()
    }
}

module.exports = {validarById};