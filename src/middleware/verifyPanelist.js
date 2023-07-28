const fs = require('fs').promises;
const { join } = require('path');

const verifyPanelist = async (req, res, next) => {
    const { id } = req.params;
    const pathComplete = join(__dirname, '..', 'talker.json');
    const talkers = await fs.readFile(pathComplete, 'utf8');
    const data = JSON.parse(talkers);
    const person = data.find((talker) => talker.id === id);
    if (!person) {
        return res.status(400).json({ message: 'Pessoa palestrante não encontrada' });
    }
    next();
};

module.exports = verifyPanelist;