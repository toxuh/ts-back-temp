import { Document, model, NativeError, Schema } from 'mongoose';
import { v4 } from 'uuid';
import { compare, genSalt, hash } from 'bcrypt-nodejs';

export type AuthToken = {
  accessToken: string;
  kind: string;
};

type ComparePasswordFunction = (
  candidatePassword: string,
  cb: (err: NativeError, isMatch: boolean) => void,
) => void;

export type UserType = Document & {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  tokens: AuthToken[];

  profile: {
    firstName: string;
    lastName: string;
    username: string;
  };

  comparePassword: ComparePasswordFunction;
};

const userSchema = new Schema<UserType>(
  {
    _id: { type: String, default: v4 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Date,

    profile: {
      firstName: String,
      lastName: String,
      username: String,
    },

    tokens: Array,
  },
  { timestamps: true },
);

// eslint-disable-next-line consistent-return
userSchema.pre('save', function save(next) {
  const user = this as UserType;
  if (!user.isModified('password')) {
    return next();
  }
  // eslint-disable-next-line consistent-return
  genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // eslint-disable-next-line consistent-return
    hash(user.password, salt, undefined, (error: NativeError, pwdHash) => {
      if (error) {
        return next(error);
      }
      user.password = pwdHash;
      next();
    });
  });
});

// eslint-disable-next-line func-names
const comparePassword: ComparePasswordFunction = function (
  candidatePassword,
  cb,
) {
  compare(
    candidatePassword,
    this.password,
    (err: NativeError, isMatch: boolean) => {
      cb(err, isMatch);
    },
  );
};

userSchema.methods.comparePassword = comparePassword;

export default model<UserType>('User', userSchema);
