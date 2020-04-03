const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    contact: {
        type: Array,
        required: true
    }
})

//mongoose.model(collection, schema)
module.exports = mongoose.model('Users', UserSchema);