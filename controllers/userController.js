const { User, Thought, Reaction } = require('../models');

// /api/user route

module.exports = {

    getUsers: async (req, res, next) =>  {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log('Error:', err);
            res.json(err);
        }
    },

}