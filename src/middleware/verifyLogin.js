const verifyname = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < 3) {
    return res.status(400).json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
    }
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || !Number.isInteger(age) || age < 18) {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  next();
};

const verifyTalker = (res, talk) => {
  const { watchedAt } = talk;
  if (!watchedAt || !watchedAt.match('/^d{2}/d{2}d{4}$/')) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const verifyTalker2 = (res, talk) => {
  const { rate } = talk;
  if (!rate || !Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || typeof talk !== 'object') {
   return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  verifyTalker(res, talk);
  verifyTalker2(res, talk);
  next();
};

const validationMiddleware = async (req, res, next) => {
  try {
    await verifyAge(req, res);
    await verifyTalk(req, res);
    await verifyname(req, res);
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = validationMiddleware;