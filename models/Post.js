const mongoose = require('mongoose');

//Describes the way our data will look
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true //title required
    },
    description: {
        type: String,
        required: false //description required
    },
    date: {
        type: Date,
        default: Date.now //default is the current date
    },
})

module.exports = mongoose.model('Posts', PostSchema);