const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');
const { friendSchema } = require('./Friend');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // email validation needed
        },
        thoughts: [thoughtSchema],
        friends: [friendSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

const User = model('user', userSchema);

module.exports = User;