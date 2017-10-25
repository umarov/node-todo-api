const { TodoList } = require('../models/todoList');

const todoListChecker = async (req, res, next) => {
  const { todoListId } = req.params;
  try {
    const todoList = await TodoList.findById(todoListId);

    if (todoList) {
      req.todoList = todoList;
      next();
    } else {
      res.status(404).send();
    }
  } catch(err) {
    res.status(404).send();
  }
};

module.exports = {
  todoListChecker
};
