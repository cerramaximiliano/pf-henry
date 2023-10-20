const express = require('express');
const router = express.Router();
const createSession = require('../controllers/payment')

router.get('/create-checkout-session', createSession);

router.get('/success', (req,res) => {res.send(`success`)});

router.get('/cancel', (req,res) => {res.send(`cancel`)});


module.exports = router;