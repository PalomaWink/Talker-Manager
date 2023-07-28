const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const { verifyAge, verifyTalk, verifyname,
  verifyTalker, verifyTalker2 } = require('../middleware/verifyLogin');
const verifyToken = require('../middleware/verifyToken');
// const verifyPanelist = require('../middleware/verifyPanelist');
const path = require('../middleware/path');

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

/* router.put('/talker/:id', verifyToken, 
  verifyname, verifyAge, verifyTalker, verifyTalker2, verifyPanelist, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const data = path();
  
    res.status(200).json({ message: 'ok' });

}); */

router.delete('/talker/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const pathComplete = join(__dirname, '..', 'talker.json');
  const talkers = await fs.readFile(pathComplete, 'utf8');
  let data = JSON.parse(talkers);
  
  data = data.filter((talker) => talker.id !== parseInt(id, 10));

  await fs.writeFile(pathComplete, JSON.stringify(data), 'utf8');
  res.status(204).end();
});

module.exports = router;