const fs = require('fs').promises;
const { join } = require('path');

const path = join(__dirname, '..', 'talker.json');

const newTalkers = async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talkers = await fs.readFile(path, 'utf8');
  const data = JSON.parse(talkers);
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: { watchedAt, rate },
  };
  data.push(newTalker);
  const updateTalkers = JSON.stringify(data);
  const write = fs.writeFile(path, updateTalkers);
  if (!write) {
    return res.status(401).json({ message: 'Erro ao cadastrar palestrante' });
  }
  return res.status(201).json(newTalker);
};

module.exports = newTalkers;