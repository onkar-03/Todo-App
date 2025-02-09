import User from '../models/User.js';
import { StatusCode } from '../utils/constant.js';
import { jsonGenerate } from '../utils/helpers.js';
import Todo from '../models/Todo.js';
import { validationResult } from 'express-validator';

export const CreateTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(StatusCode.VALIDATION_ERROR),
      'Todo is required',
      errors.mapped(),
    );
  }

  try {
    const result = await Todo.create({
      userId: req.userId,
      desc: req.body.desc,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        },
        { new: true },
      );

      return res.json(
        jsonGenerate(StatusCode.SUCCESS, 'Todo created Successfully', result),
      );
    }
  } catch (errors) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        'Somethign is wrong',
        errors,
      ),
    );
  }
};
