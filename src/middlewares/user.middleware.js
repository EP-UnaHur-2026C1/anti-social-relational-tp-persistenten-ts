const { User } = require('../db/models')
const validarById = require('./generic.middleware');
const userSchema = require('../schemas/user.schema');
const genericSchemaValidator = require('../schemas/genericSchemaValidator');

const validarUserById = validarById(User);

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

module.exports = { validarUserById, validarUserSchema, validarNicknameUnico };