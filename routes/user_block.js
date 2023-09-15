const { registerUserBlock } = require('../controllers/transaction_saw');
const router = require('express').Router();

router.post('/user', registerUserBlock);


module.exports = router;