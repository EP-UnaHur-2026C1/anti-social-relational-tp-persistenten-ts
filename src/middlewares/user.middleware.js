const { User } = require('../db/models')
const {validarById} = require('./generic.middleware');
const userSchema = require('../schemas/user.schema');
const genericSchemaValidator = require('../schemas/genericSchemaValidator');

const validarUserById = validarById(User);

const validarOtroUserById = async (req, res, next) => {
    const otroUser = await User.findByPk(req.params.otroId);
    if (!otroUser) {
        return res.status(404).json({error: 'Usuario no encontrado'});
    }

    next();
};

const validarUserSchema = (req, res, next) => {
  const { error } = genericSchemaValidator(userSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: error.details.map((e) => ({
        atributo: e.path[0],
        detalle: e.message,
      })),
    });
    return;
  }
  next();
};

const validarNicknameUnico = async (req, res, next) => {
  try {
    const existe = await User.findOne({ where: { nickName: req.body.nickName } });
    if (existe) return res.status(400).json({ error: 'El nickName ya está en uso' });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const validarSeguirseSolo = async (req, res, next) => {
  try {
    if (req.params.id === req.params.otroId) {
      return res.status(400).json({message: 'Un usuario no se puede seguir o dejar de seguirse a sí mismo'})
    }
    next()
  } catch (err){
      res.status(500).json({ error: err.message });
  }
}

const validarSeguir = async (req, res, next) =>{
  try {
    const {id, otroId} = req.params
    const user = await User.findByPk(id);
    const usersSeguidos = await user.getSiguiendo({ where: {id: otroId}}); // en mi lista de usuarios seguidos, filtro por el id del que quiero seguir
    if (usersSeguidos.length > 0) { // Si esa lista de seguidos, ahora filtrada, es mayor a 0, significa que ya lo estaba siguiendo
      return res.status(400).json({message: 'Ya está siguiendo a este usuario'});
    }

    
    next()
  }catch(err){
    res.status(500).json({error: err.message})
  }
}

const validarDejarDeSeguir = async (req, res, next) => {
  try {  
    const { id, otroId } = req.params;
    const user = await User.findByPk(id);
    const usersSeguidos = await user.getSiguiendo({ where: { id: otroId }});

    if (usersSeguidos.length === 0) {
      return res.status(400).json({ message: 'No seguís a este usuario'});
    }
    next();
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

module.exports = { validarUserById, validarUserSchema, validarNicknameUnico, validarOtroUserById, validarSeguirseSolo, validarSeguir, validarDejarDeSeguir };