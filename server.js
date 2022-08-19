// require modules suttup port
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// require models
const { User, Thought } = require('./models');

// connect express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// connect mongoose
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
});