const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).all(createUser);

// /api/user/:userId

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;