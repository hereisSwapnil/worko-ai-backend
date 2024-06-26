const User = require("../models/userModel");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUsers = async () => {
  return await User.find({ isDeleted: false });
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  );
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    email,
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
