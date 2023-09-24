const { loginDocente } = require('../controllers/docente');
const { registerDocente} = require('../controllers/docente')
const userController = require('../controllers/docente');

const router = require('express').Router();

router.post('/docente/register', registerDocente);
router.post('/docente/login', loginDocente);
router.post('/docente', userController.getUserByMail);
router.get('/docente/:dni', userController.getUserByDNI);
 
module.exports = router;