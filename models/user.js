const { Schema, model, SchemaTypes } = require('mongoose');

const UserSchema = new Schema({
    // username -string, unique, required, trimmed
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    // email -string, unique, required, Must match a valid email address (look into Mongoose's matching validation)
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    // thoughts - []_id values referencing Thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    // friends - []_id values referencing User model
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});
// virtual schema friendCount