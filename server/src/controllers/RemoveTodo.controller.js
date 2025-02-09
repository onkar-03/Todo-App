import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helpers.js';
import { StatusCode } from '../utils/constant.js';
import Todo from '../models/Todo.js';
import User from '../models/User.js';

export const RemoveTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        'Todo Id Required',
        error.mapped(),
      ),
    );
  }

  try {
    const result = await Todo.findOneAndDelete({
      user: req.userId,
      _id: req.body.todo_id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        { $pull: { todos: req.body.todo_id } },
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, 'Todo Removed', null));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        'Todo Id is required',
        error.mapped(),
      ),
    );
  }
};
