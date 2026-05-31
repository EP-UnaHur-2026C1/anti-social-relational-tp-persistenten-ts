const { Router } = require("express");
const { getAll, getById, createPost, updatePost, deletePost , addImage, deleteImage } = require('../controllers/posts.controller');
const router = Router();

router.get('/',    getAll);
router.get('/:id', getById);
router.post('/',   createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

router.post('/:id/imagenes', addImage);
router.delete('/:id/imagenes/:imgId', deleteImage);

module.exports = router;