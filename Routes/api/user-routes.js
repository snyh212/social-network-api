// require express and user model
const app = require('express').Router();
const { User } = require('../../models')

// Get all Users
app.get('/', (req, res) => {
    User.find()
        .then(userData => {
            console.log(userData)
            res.json(userData);
        })
        .catch(err => {
            res.json(err);
        });
});
// Get 1 user by _id
app.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
    .select('-__v')
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
});
// Post a new User
app.post('/', ({ body }, res) => {
    User.create(body)
        .then(userData => {
            res.json(userData);
        })
        .catch(err => {
            res.json(err);
        });
});
// Update with put
app.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })
    .then(userData => {
        if (!userData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});
// delete user by _id
app.delete('/:id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id }).then(userData => {
        if (!userData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post and delete for friends
app.post('/:id/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId } },
        { new: true }
      )
      .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(400).json({ message: 'No user found with this id!'});
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
});

app.delete('/:id/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
      .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(400).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
}); 