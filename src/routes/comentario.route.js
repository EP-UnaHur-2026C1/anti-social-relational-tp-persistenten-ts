const { Router } = require("express");
const { getAll, getById, createComentario, updateComentario, deleteComentario } = require('../controllers/comentarios.controller');
router = Router();

const {
  validarComentarioSchema,
  validarComentarioById,
  verificarComentarioPerteneceAlPost
} = require('../middlewares/comentario.middleware');


router.get('/', getAll);
router.get('/:id', validarComentarioById, getById);
router.post('/', validarComentarioSchema, verificarComentarioPerteneceAlPost, createComentario);
router.put('/:id', validarComentarioById, validarComentarioSchema, updateComentario);
router.delete('/:id', validarComentarioById, verificarComentarioPerteneceAlPost, deleteComentario);

module.exports = router;