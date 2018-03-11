export const todoListChecker = async (req, res, next) => {
  const { user, params } = req;
  const { todoListId } = params;
  try {
    const todoList = await user.todoLists.find(todoList => todoList.id === +todoListId);

    if (todoList) {
      req.todoList = todoList;
      next();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(404).send();
  }
};
