const router = require('express').Router();
const { getAll, getById, createTag, updateTag, deleteTag } = require('../controllers/tags.controler');


router.get('/', getAll);
router.get('/:id',  getById);
router.post('/',  createTag);
router.put('/:id',  updateTag);
router.delete('/:id',  deleteTag);


module.exports = router;