const { Router } = require("express");
const { getAll, getById, createPost, createPostImagenTag, updatePost, deletePost, getWithImagenesById } = require('../controllers/posts.controller');
router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createPost);
router.post('/create-imagen-tag', createPostImagenTag);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get("/:id/imagen", getWithImagenesById) // Ver de sumarle o hacer otro con tags y comentarios

module.exports = router;