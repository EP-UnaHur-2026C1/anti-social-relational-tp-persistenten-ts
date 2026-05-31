const { Router } = require("express");
const { findAll } = require('../controllers/comentarios.controler');
router = Router();

router.get('/', findAll);

module.exports = router;