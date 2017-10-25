const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const TodoItem = mongoose.model('TodoItem', TodoItemSchema)

module.exports = {
  TodoItemSchema,
  TodoItem
}
