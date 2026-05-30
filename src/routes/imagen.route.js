const { Router } = require("express");
const { findAll } = require('../controllers/imagenes.controlers');
router = Router();

router.get('/', findAll);

module.exports = router;