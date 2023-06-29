const router = require('express').Router();
const { getAllUsers, getUser, createUser } = require('../controllers/users');
const { doesUserExist } = require('../middlewares/users');

router.get('/', getAllUsers);
router.get('/:userId', doesUserExist);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;
