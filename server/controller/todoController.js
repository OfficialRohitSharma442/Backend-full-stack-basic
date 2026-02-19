import { Todo } from './../models/todo.model.js';
export const createTodo = async (req, res) => {
  try {
    const { title, dectiption } = req.body;
    if (!title && !dectiption) {
      return res
        .status(403)
        .json({ success: false, message: 'All fealds are required' });
    }
    let todo = await Todo.create({ title, dectiption });
    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo,
    });
  } catch (error) {
    console.log({ error });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    let todos = await Todo.find();
    return res.status(200).json({
      success: true,
      message: 'todos featch successfully',
      todos,
    });
  } catch (error) {
    console.log({ error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, dectiption } = req.body;
    if (!todoId) {
      return res
        .status(403)
        .json({ success: false, message: 'Please add fields' });
    }
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, dectiption },
      {
        new: true,
      }
    );

    // if (!title || !dectiption) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: 'All fealds are required' });
    // }
    return res
      .status(200)
      .json({ success: true, message: 'todo updated successfully', todo });
  } catch (error) {
    console.log({ error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    let todo = await Todo.findByIdAndDelete(todoId);

    res.status(200).json({
      status: true,
      message: 'deleted todo successfully',
      todo,
    });
  } catch (error) {
    console.log({ error });
  }
};
