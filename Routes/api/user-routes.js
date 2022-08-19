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
// Post a new User
// Update with put
// delete user by _id