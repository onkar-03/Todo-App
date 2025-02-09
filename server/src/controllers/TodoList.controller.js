import { StatusCode } from '../utils/constant.js';
import { jsonGenerate } from '../utils/helpers.js';
import User from '../models/User.js';

export const GetTodos = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select('-password')
      .populate('todos')
      .exec();

    return res.json(jsonGenerate(StatusCode.SUCCESS, 'All Todo List', list));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, 'Error', error),
    );
  }
};
