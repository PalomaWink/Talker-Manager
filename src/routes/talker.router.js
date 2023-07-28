const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const { verifyAge, verifyTalk, verifyname,
  verifyTalker, verifyTalker2 } = require('../middleware/verifyLogin');
const verifyToken = require('../middleware/verifyToken');
const { path, pathWrite } = require('../middleware/path');

const router = express.Router();

router.get('/talker', async (_req, res) => {
  const data = await path();
  if (!data) {
    return res.status(200).json([]);
  }
  return res.status(200).json(data);
});

router.post('/talker', verifyToken, verifyname, verifyAge, verifyTalk, 
  verifyTalker, verifyTalker2, async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  console.log(req.body);
  const talkers = await path();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: { watchedAt, rate },
  };
  talkers.push(newTalker);
  const updateTalkers = JSON.stringify(talkers);
  const pathComplete = join(__dirname, '..', 'talker.json');
  await fs.writeFile(pathComplete, updateTalkers, 'utf8');
  // await pathWrite(updateTalkers);
  return res.status(201).json(newTalker);
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