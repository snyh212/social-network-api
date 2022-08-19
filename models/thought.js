const { Schema, model } = require('mongoose');

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
        default: Date.now(),
        get: (val) => formatDate(val)
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
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false
})

function formatDate() {
    console.log(`The current date is ${this.createdAt}`)
}


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
        default: Date.now(),
        get: (val) => formatDate(val)
    },
},
{
    toJSON: {
      getters: true
    },
    id: false
})


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;