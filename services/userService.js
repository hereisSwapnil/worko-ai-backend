const userDAO = require("../daos/userDAO");

const createUser = async (userData) => {
  const existingUser = await userDAO.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  return await userDAO.createUser(userData);
};

const getUsers = async () => {
  return await userDAO.getUsers();
};

const getUserById = async (userId) => {
  return await userDAO.getUserById(userId);
};

const updateUser = async (userId, userData) => {
  return await userDAO.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
  return await userDAO.deleteUser(userId);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
