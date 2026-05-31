const router = require('express').Router();
const { getAll, getById, createTag, updateTag, deleteTag } = require('../controllers/tags.controller');
const {validarTagById, validarTagSchema} = require('../middlewares/tag.middleware')

router.get('/', getAll);
router.get('/:id',validarTagById,  getById);
router.post('/',validarTagSchema,  createTag);
router.put('/:id',validarTagById,  updateTag);
router.delete('/:id',validarTagById,  deleteTag);


module.exports = router;