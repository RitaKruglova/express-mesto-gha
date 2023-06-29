const router = require('express').Router();
const { getAllUsers, getUser, createUser } = require('../controllers/users');
const { doesUserExist } = require('../middlewares/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', doesUserExist);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
