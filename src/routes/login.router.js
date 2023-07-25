const express = require('express');
const crypto = require('crypto');
const validationLogin = require('../middleware/validationLogin');

const router = express.Router();

router.post('/login', validationLogin, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

module.exports = router;