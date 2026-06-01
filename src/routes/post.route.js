const { Router } = require("express");
const { getAll, getById, createPost, updatePost, deletePost , addImage, deleteImage } = require('../controllers/posts.controller');
const router = Router();

const { 
  validarPostSchema, 
  verificarUsuarioExistente, 
  validarPostById 
} = require('../middlewares/post.middleware');

router.get('/', getAll);
router.get('/:id', validarPostById ,getById);
router.post('/', validarPostSchema, verificarUsuarioExistente, createPost);
router.put('/:id', validarPostById, validarPostSchema, updatePost);
router.delete('/:id', validarPostById,deletePost);

router.post('/:id/imagenes', validarPostById, addImage);
router.delete('/:id/imagenes/:imgId', validarPostById, deleteImage);

module.exports = router;