const { Router } = require("express");
const { getAll, getById, createImagen, updateImagen, deleteImagen } = require('../controllers/imagenes.controller');

router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createImagen);
router.put('/:id', updateImagen);
router.delete('/:id', deleteImagen);

module.exports = router;