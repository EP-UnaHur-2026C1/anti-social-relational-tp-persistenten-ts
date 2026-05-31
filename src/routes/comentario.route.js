const { Router } = require("express");
const { getAll, getById, createComentario, updateComentario, deleteComentario } = require('../controllers/comentarios.controller');
router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createComentario);
router.put('/:id', updateComentario);
router.delete('/:id', deleteComentario);

module.exports = router;