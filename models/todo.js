const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    }
})

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;