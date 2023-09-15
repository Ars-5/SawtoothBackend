const { registerUser, loginUser} = require('../controllers/user')
const userController = require('../controllers/user');

const router = require('express').Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/user', userController.getUserByMail);


module.exports = router;