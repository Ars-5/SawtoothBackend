
const { registerLista } = require('../controllers/listaingresantes');
const { registerReport } = require('../controllers/report')

const router = require('express').Router();

router.post('/report', registerReport);
router.post('/lista', registerLista);

module.exports = router;