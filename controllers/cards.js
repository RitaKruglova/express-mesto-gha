const { handleThen } = require('../helpers/handlingErrors');
const Card = require('../models/card');
const errors = require('../helpers/errors');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => handleThen(cards, res))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new errors.BadRequestError('Карточка не найдена');
      }
      if (req.user._id !== card.owner._id.toString()) {
        throw new errors.ForbiddenError('Вы не можете удалить чужую карточку');
      }

      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => handleThen(card, res))
        .catch(next);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => handleThen(card, res))
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => handleThen(card, res))
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => handleThen(card, res))
    .catch(next);
};
