const router = require('express').Router();
const {
  getAllUsers, getUser, createUser, changeAvatar, changeUserInfo,
} = require('../controllers/users');
const { doesUserExist } = require('../middlewares/users');

router.get('/', getAllUsers);
router.get('/:userId', doesUserExist);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', changeUserInfo);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
