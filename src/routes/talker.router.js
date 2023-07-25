const express = require('express');
// const validationMiddleware = require('../middleware/verifyLogin');
// const { verifyToken } = require('../middleware/verifyToken');
const path = require('../middleware/path');
// const newTalkers = require('../middleware/newTalker');

const router = express.Router();

router.get('/talker', async (_req, res) => {
  const data = await path();
  if (!data) {
    return res.status(200).json([]);
  }
  return res.status(200).json(data);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await path();
  const talker = data.find((talk) => talk.id === parseInt(id, 10));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

module.exports = router;