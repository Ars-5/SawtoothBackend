const { registerUser, loginUser} = require('../controllers/user')
const { registerExam} = require('../controllers/examen')
const userController = require('../controllers/user');

const router = require('express').Router();

router.post('/registerexam', registerExam);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/user', userController.getUserByMail);
router.put('/user/update/:dni', userController.updateUserByDNI);
router.get('/user/:dni', userController.getUserByDNI);
 
module.exports = router;