const express = require('express');
const router = express.Router();
const createSession = require('../controllers/payment')
const webHookHandler = require('../handlers/webHookHandler')

router.post('/create-checkout-session', createSession);

router.get('/success', (req,res) => {res.send(`success`)});

router.post('/webhook', webHookHandler);

router.get('/cancel', (req,res) => {res.send(`cancel`)});


module.exports = router;