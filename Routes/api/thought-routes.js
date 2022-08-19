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
app.post('/', ({ body }, res) => {
    Thought.create(body)
        .then(({ _id }) =>
            User.findOneAndUpdate({}, { $push: { thoughts: _id } }, { new: true })
        )
        .then(thoughtData => {
            res.json(thoughtData);
        })
});
// put to update
app.put('/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })
        .then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thoughtData);
        })
});
// delete
app.delete('/:userId/:thoughtId', ({ params }, res) => {
    Thought.findOneAndDelete(
        { _id: params.thoughtId },
        { new: true, runValidators: true })
        .then((thoughtData) => {
          if (!thoughtData) {
            res.status(404).json({
              message: "No user found with this id!",
            });
            User.findOneAndUpdate(
              { thoughts: params.thoughtId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            )
          }
          
        }).then(res.json("Thought deleted!"))
});

//api/thoughts/:thoughtId/reactions post and delete
app.post('/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate
    (
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true }
    )
    .select('-__v')
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(400).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thoughtData);
    })
});

app.delete('/:userId/:thoughtId/:reactionId', ({ params }, res) => {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId},
        { $pull: { reactions: { reactionId: params.reaction}}},
        { new: true }
    )
    .select('-__v')
    .then(thoughtData => {
        if (!dbThoughtData) {
            res.status(400).json({ message: 'No reaction or thought found with given ids!'
        });
        return;
    }
        res.json(thoughtData)
    })
});

module.exports = app