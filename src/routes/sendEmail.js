const express = require('express');
const router = express.Router();

const { sendEmailHandler } = require('../handlers/sendEmailHandler');

router.post('/send-email', sendEmailHandler);

module.exports = router;

