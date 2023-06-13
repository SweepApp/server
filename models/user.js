const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports.User = mongoose.model('User', userSchema);