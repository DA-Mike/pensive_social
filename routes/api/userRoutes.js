const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).all(createUser);

// /api/user/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/user/friends/:friendId
router
    .route('/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;