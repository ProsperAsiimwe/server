const mongoose = require("mongoose");
const User = require("../models/user");

/**
 *
 * @param {*} userData
 * @returns
 */
exports.createUser = async (userData) => {
  try {
    const user = new User(userData);

    const newUser = await user.save();

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @returns
 */
exports.getAllUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
