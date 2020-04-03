const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Parsing middleware. Available under the req.body property.
const bodyParser = require('body-parser');

// Storing configuration in the environment separate from code
require('dotenv/config');

app.use(bodyParser.json());

// Import routes
const postsRoute = require('./routes/posts')
const usersRoute = require('./routes/users')

app.use('/posts', postsRoute);
app.use('/users', usersRoute);


//Routes
app.get('/', (req, res) => {
    res.send('This is home')
})

//Mongoose connection
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to mongoDB');
})

//App listen
app.listen(3000, function () {
    console.log('Server listening on port 3000')
})