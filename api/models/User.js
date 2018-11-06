import mongoose from 'mongoose';

const User = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


export default mongoose.model('User', User);
