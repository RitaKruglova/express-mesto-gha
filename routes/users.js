const router = require('express').Router();
const {
  getAllUsers, getUser, createUser, changeAvatar, changeUserInfo, login, getCurrentUser,
} = require('../controllers/users');
const { doesUserExist } = require('../middlewares/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', doesUserExist);
router.get('/:userId', getUser);
router.post('/signup', createUser);
router.patch('/me', changeUserInfo);
router.patch('/me/avatar', changeAvatar);
router.post('/signin', login);

module.exports = router;
