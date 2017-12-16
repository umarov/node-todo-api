const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TodoItemSchema } = require('./todoItem');

const TodoListSchema =  new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  color: {
    type: String,
    default: 'yellow',
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  todoItems: [TodoItemSchema]
})

const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = {
  TodoList,
  TodoListSchema
};
