const router = require('express').Router();
const { getAll, getById, createUser, updateUser, deleteUser } = require('../controllers/users.controler');
const { validarUserById, validarUserSchema, validarNicknameUnico } = require('../middlewares/user.middleware');

router.get('/', getAll);
router.get('/:id', validarUserById, getById);
router.post('/', validarUserSchema, validarNicknameUnico, createUser);
router.put('/:id', validarUserById, validarUserSchema, validarNicknameUnico, updateUser);
router.delete('/:id', validarUserById, deleteUser);

module.exports = router;