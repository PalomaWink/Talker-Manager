const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const router = express.Router();

router.get('/talker', async (_req, res) => {
    const path = join(__dirname, '..', 'talker.json');
    const talkers = await fs.readFile(path, 'utf8');
    const data = JSON.parse(talkers);
    if (!data) {
      return res.status(200).json([]);
    }
    return res.status(200).json(data);
});

module.exports = router;