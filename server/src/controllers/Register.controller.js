import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helpers.js';
import { StatusCode, JWT_TOKEN_SECRET } from '../utils/constant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure the User model is imported

const Register = async (req, res) => {
  const errors = validationResult(req);

  // If there are validation errors, return immediately
  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        'Validation error',
        errors.mapped(),
      ),
    );
  }

  // Extract request body values
  const { name, username, password, email } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userExist = await User.findOne({
    $or: [
      { email: email },
      {
        username: username,
      },
    ],
  });

  if (userExist) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        'User or EMail already exists',
        {},
      ),
    );
  }

  // Save user to DB
  try {
    const result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      username: username,
    });

    const token = jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

    return res.json(
      jsonGenerate(
        StatusCode.SUCCESS,
        'Registration Successful',
        { userId: result._id, token: token },
        token,
      ),
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(jsonGenerate(StatusCode.SERVER_ERROR, 'Server error', {}));
  }
};

export default Register;
