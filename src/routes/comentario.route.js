const { Router } = require("express");
const { getAll, getById, createComentario, updateComentario, deleteComentario } = require('../controllers/comentarios.controller');
router = Router();

const {
  validarComentarioSchema,
  validarComentarioById,
  verificarRelacionesComentario
} = require('../middlewares/comentario.middleware');


router.get('/', getAll);
router.get('/:id', validarComentarioById, getById);
router.post('/', validarComentarioSchema, verificarRelacionesComentario, createComentario);
router.put('/:id', validarComentarioById, validarComentarioSchema, updateComentario);
router.delete('/:id', validarComentarioById,  deleteComentario);

module.exports = router;