const fs = require('fs').promises;
const { join } = require('path');

const path = async () => {
    const pathComplete = join(__dirname, '..', 'talker.json');
    const talkers = await fs.readFile(pathComplete, 'utf8');
    const data = JSON.parse(talkers);
    return data;
};

const pathWrite = async (talker) => {
    const pathComplete = join(__dirname, '..', 'talker.json');
    await fs.writeFile(pathComplete, talker, 'utf8');
};

module.exports = { path, pathWrite };