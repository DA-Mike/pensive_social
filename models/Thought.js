const { Schema, model } = require('mongoose');
const Reactions = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            //   TODO: * Use a getter method to format the timestamp on query
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ Reactions ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
            getters: true,
        },
        id: false,
    },
)

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;