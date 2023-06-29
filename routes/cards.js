const router = require('express').Router();
const { getAllCards, deleteCard, createCard } = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);

module.exports = router;
