import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user',  enum: ['user',  'admin']  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  last_connection: { type: Date, default: null },
  jwtToken: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);