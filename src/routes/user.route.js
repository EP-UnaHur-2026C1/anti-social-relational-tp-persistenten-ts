const router = require('express').Router();
const { getAll, getById, createUser, seguirUser, updateUser, deleteUser, dejarDeSeguirUser } = require('../controllers/users.controller');
const { validarUserById, validarUserSchema, validarNicknameUnico, validarOtroUserById, validarSeguirseSolo, validarSeguir, validarDejarDeSeguir} = require('../middlewares/user.middleware');

router.get('/', getAll);
router.get('/:id', validarUserById, getById);
router.post('/', validarUserSchema, validarNicknameUnico, createUser);
router.post('/:id/seguidores/:otroId', validarUserById, validarOtroUserById, validarSeguirseSolo, seguirUser);
router.put('/:id', validarUserById, validarUserSchema, validarNicknameUnico, updateUser);
router.delete('/:id', validarUserById, deleteUser);
router.delete('/:id/seguidores/:otroId',validarUserById, validarOtroUserById, validarSeguirseSolo, validarDejarDeSeguir, dejarDeSeguirUser);

module.exports = router;