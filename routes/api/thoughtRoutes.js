const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).all(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route(`/:thoughtId/reactions`).post(addReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route(`/:thoughtId/reactions/:reactionId`).delete(deleteReaction);

module.exports = router;