const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => res.status(500).send({ error }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.CardId)
    .then(() => {
      res.status(202).send();
    })
    .catch((error) => res.status(500).send({ error }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => res.status(500).send({ error }));
};
