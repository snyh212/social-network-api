const { Schema, model } = require('mongoose');

// virtual reactionCount and reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        get: (date) => {
          if (date) return date.toISOString().split("T") [0];
        }
    },
},
{
    toJSON: {
      getters: true
    },
    id: false
})

const thoughtSchema = new Schema({
    // thoughtText 
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // createdAt
    createdAt: {
        type: Date,
        get: (date) => {
          if (date) return date.toISOString().split("T") [0];
        }
    },
    // username
    username: {
        type: String,
        required: true,
    },
    // reactions [reactionSchema]
    reactions: [reactionSchema]
},
{
    timestamps: true,
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;