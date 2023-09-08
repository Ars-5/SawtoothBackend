const { registerUser, loginUser} = require('../controllers/user')
const { listUsers } = require('../controllers/user'); 
const userController = require('../controllers/user');

const router = require('express').Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/list', listUsers);
router.get('/user/:username', userController.getUserByUsername);

module.exports = router;