const express = require('express');
const router = express.Router();
const {createSession, updateSession} = require('../handlers/paymentsHandler')

router.post('/create-checkout-session', createSession);
router.post('/update/session', updateSession)


module.exports = router;