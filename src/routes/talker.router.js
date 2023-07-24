const express = require('express');

const router = express.Router();

router.get('/poppy', (req, res) => {
    res.send('OK');
});

module.exports = router;