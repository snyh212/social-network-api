// username -string, unique, required, trimmed
// email -string, unique, required, Must match a valid email address (look into Mongoose's matching validation)
// thoughts - []_id values referencing Thought model
// friends - []_id values referencing User model
// virtual schema friendCount