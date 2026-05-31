const { Router } = require("express");
const { findAll } = require('../controllers/posts.controllers');
router = Router();

router.get('/', findAll);

module.exports = router;