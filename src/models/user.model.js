import mongoose, { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: false,
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],

    password: {
      type: String,
      required: [true, 'Password is required!'],
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Do not ever use arrow function in these as we have to bind the variables with this keyword
userSchema.pre('save', async function (next) {
  // checking that the fields coming to save in that field if password is not modified then it will pass
  if (!this.isModified('password')) return next();
  //   if password is modified then it will bcrypt 10 times
  this.password = bcrypt.hash(this.password, 10);
  next();
});

// checking by dcrypting the password that encrypted password and password before saving is matching or not
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Genrate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Genrate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model('User', userSchema);
