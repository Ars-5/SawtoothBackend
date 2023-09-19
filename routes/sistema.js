
const { registerReport } = require('../controllers/report')

const router = require('express').Router();

router.post('/report', registerReport);

module.exports = router;