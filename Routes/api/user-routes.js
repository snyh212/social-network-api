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
// delete user by _id