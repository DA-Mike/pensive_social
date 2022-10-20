const { Schema, model } = require('mongoose');

// TODO: Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

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
        userName: {
            type: String,
            required: true,
        }, // TODO: probably need to build association to User
        reactions: [reactionSchema],
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

// **Thought**:

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.