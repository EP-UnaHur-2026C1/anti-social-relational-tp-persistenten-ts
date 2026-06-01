const { Router } = require("express");
const { getAll, getById, createPost, updatePost, deletePost , addImage, deleteImage, getComentarios, addComentario, deleteComentario } = require('../controllers/posts.controller');
const router = Router();

const { 
  validarPostSchema, 
  verificarUsuarioExistente, 
  validarPostById 
} = require('../middlewares/post.middleware');

const { validarComentarioById, 
  validarComentarioSchema, 
  verificarComentarioPerteneceAlPost
} = require('../middlewares/comentario.middleware');

router.get('/', getAll);
router.get('/:id', validarPostById ,getById);
router.post('/', validarPostSchema, verificarUsuarioExistente, createPost);
router.put('/:id', validarPostById, validarPostSchema, updatePost);
router.delete('/:id', validarPostById,deletePost);

router.post('/:id/imagenes', validarPostById, addImage);
router.delete('/:id/imagenes/:imgId', validarPostById, deleteImage);

router.get('/:id/comentarios',validarPostById,  getComentarios);
router.post('/:id/comentarios', validarPostById, validarComentarioSchema, verificarUsuarioExistente, addComentario);
router.delete('/:id/comentarios/:comentarioId', validarPostById, validarComentarioById, verificarComentarioPerteneceAlPost, deleteComentario);

module.exports = router;