const { ObjectId } = require('bson');
const { User, Thought, Reaction } = require('../models');

// /api/user route

module.exports = {

    getUsers: async (req, res, next) =>  {
        try {
            const users = await User.find();
            // const usersObj = await thoughts
            res.json(users);
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }
    },
    getSingleUser: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'User not found'});
            } else {
                res.json(user);
            }
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }; 
    },
    createUser: async (req, res, next) => {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    updateUser: async (req, res, next) => {
        try {
            const update = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
            );
            if (!update) {
                res.status(404).json({ message:'No user with this ID!' });
            } else {
                res.json(update);
            };
        } catch (err) {
            console.log('Error:', err);
            res.status(500).json(err);
        };
    },
    deleteUser: async (req, res, next) => {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'User not found'});
            } else {
                res.json({ message: 'User deleted!'});
            };
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }; 
    },
};