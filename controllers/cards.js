const { handleThen, handleCatch } = require('../helpers/handlingErrors');
const Card = require('../models/card');
const errors = require('../helpers/errors');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => handleThen(cards, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new errors.BadRequestError('Карточка не найдена'));
      }
      console.log(card.owner._id.toString());
      if (req.user._id !== card.owner._id.toString()) {
        return Promise.reject(new errors.ForbiddenError('Вы не можете удалить чужую карточку'));
      }

      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => handleThen(card, res))
        .catch((error) => handleCatch(error, res));
    })
    .catch((error) => handleCatch(error, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => handleThen(card, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => handleThen(card, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => handleThen(card, res))
    .catch((error) => handleCatch(error, res));
};
