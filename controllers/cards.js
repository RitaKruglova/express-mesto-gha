const { handleThen, handleCatch } = require('../config/handlingErrors');
const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => handleThen(cards, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.CardId)
    .then((card) => handleThen(card, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user);
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
