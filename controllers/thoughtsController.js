const { User, Thought, Reaction } = require('../models');

// /api/thoughts route

module.exports = {

    getThoughts: async (req, res, next) =>  {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }
    },
    getSingleThought: async (req, res, next) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!user) {
                res.status(404).json({ message: 'Thought not found'});
            } else {
                res.json(thought);
            }
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }; 
    },
    createThought: async (req, res, next) => {
        try {
            const newThought = await Thought.create(req.body);
            const addToUser = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: newThought._id } },
                { new: true },
            );
            if (!addToUser) {
                res.status(404).json({ message: 'Thought created, but found no user with that ID' });
            } else {
                res.json('Created the thought 🎉');
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    updateThought: async (req, res, next) => {
        try {
            const update = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );
            if (!update) {
                res.status(404).json({ message:'No thought with this ID!' });
            } else {
                res.json(update);
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    deleteThought: async (req, res, next) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found'});
            } else {
                res.json({ message: 'Thought deleted!'});
            };
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }; 
    },
    // /api/thoughts/:thoughtId/reactions
    addReaction: async (req, res, next) => {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true },
            );
            if (!newReaction) {
                res.status(404).json({ message: 'No user with that ID' });
            } else {
                res.json('New reaction added 🎉');
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    // /api/thoughts/:thoughtId/reactions/reactionId
    deleteReaction: async (req, res, next) => {
        try {
            const user = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId  },
                { $pull: { reactions: req.params.reactionId } },
                );
            if (!user) {
                res.status(404).json({ message: 'User not found'});
            } else {
                res.json({ message: 'Reaction deleted!'});
            };
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }; 
    },
};