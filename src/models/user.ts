import { model, Schema } from 'mongoose';

export type UserType = {
  username: string;
  password: string;
};

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default model('User', userSchema);
