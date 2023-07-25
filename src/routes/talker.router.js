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

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const path = join(__dirname, '..', 'talker.json');
  const talkers = await fs.readFile(path, 'utf8');
  const data = JSON.parse(talkers);
  const talker = data.find((talk) => talk.id === parseInt(id, 10));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

module.exports = router;