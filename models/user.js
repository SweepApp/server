const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    username: String,
    avatar: String,
    matches: Number,
    history: [
      {
        matchId: String,
        result: String,
        date: Date
      }
    ],
    friends: [
      {
        friendId: String,
        friendName: String,
        friendAvatar: String
      }
    ]
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
)

module.exports = mongoose.model('User', userSchema)
