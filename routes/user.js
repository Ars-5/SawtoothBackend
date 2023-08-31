const { registerUser } = require('../controllers/user')
const { listUsers } = require('../controllers/user'); 

const router = require('express').Router();



router.post('/register', registerUser)
router.get('/list', listUsers);

module.exports = router;