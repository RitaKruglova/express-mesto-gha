const router = require('express').Router();
const { getAllUsers, getUser } = require('../controllers/users');
const { doesUserExist } = require('../middlewares/users');

router.get('/', getAllUsers);
router.get('/:userId', doesUserExist);
router.get('/:userId', getUser);
