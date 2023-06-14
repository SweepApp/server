const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUser = async serviceData => {
  console.log(serviceData);
  try {
    const user = await User.findOne({ username: serviceData.username }) || await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12);

    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      username: serviceData.username,
      avatar: serviceData.avatar,
    });

    console.log(newUser);
    let result = await newUser.save();

    return result;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.getUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error('User not found!');
    }

    return user.toObject();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.loginUser = async serviceData => {
  try {
    const user = await User.findOne({ username: serviceData.username });

    if (!user) {
      throw new Error('User not found!');
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      throw new Error('Password is invalid');
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    const email = user.email;
    const avatar = user.avatar;

    return { token, email, avatar };
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        username: serviceData.body.username,
      },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found!');
    }

    return user.toObject();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};
