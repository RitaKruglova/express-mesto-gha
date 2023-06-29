const router = require('express').Router();
const { getAllCards, getCard, createCard } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.get('/cards/:cardId', getCard);
router.post('/cards', createCard);

module.exports = router;
