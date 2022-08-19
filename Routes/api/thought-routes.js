// require express thoughts and user model
const app = require('express').Router();
const { Thought, User } = require('../../models')

// get all thoughts
app.get('/', (req, res) => {
    Thought.find()
     .select('-__v')
     .sort('-createdAt')
    .then(thoughtData => {
        console.log(thoughtData);
        res.json(thoughtData)
    })
});
// get 1 by _id
app.get('/:id', ({ params }, res) => {
    Thought.findOne({_id: params.id})
    .select('-__v')
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(thoughtData);
    })
});
// post for new
// put to update
// delete
//api/thoughts/:thoughtId/reactions