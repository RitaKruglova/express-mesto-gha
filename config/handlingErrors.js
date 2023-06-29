const mongoose = require('mongoose');

module.exports.handleCatch = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ messege: 'Переданы некорректные данные' });
  } else {
    res.status(500).send({ messege: 'Что-то пошло не так...(' });
  }
};

module.exports.handleThen = (data, res) => {
  if (data === null) {
    res.status(404).send({ messege: 'Объект не найден' });
  } else {
    res.send({ data });
  }
};
