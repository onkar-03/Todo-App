import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 32,
  },
  username: {
    type: String,
    min: 6,
    max: 32,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 32,
    required: true,
    unique: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
