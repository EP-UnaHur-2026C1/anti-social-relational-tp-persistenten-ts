const router = require('express').Router();
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const comentarioRoute = require('./comentario.route');
const tagRoute = require('./tag.route');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comentarios', comentarioRoute);
router.use('/tags', tagRoute);

module.exports = router;