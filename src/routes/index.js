const router = require('express').Router();
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentRoute = require('./comentario.route');
const tagRoute = require('./tag.route');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);
router.use('/tags', tagRoute);

module.exports = router;