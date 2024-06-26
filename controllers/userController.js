const userService = require("../services/userService");
const {
  validateCreateUser,
  validateUpdateUser,
  validateId,
} = require("../utils/validateRequest");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const { error } = validateId(userId);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", details: error.details[0].message });
  }

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createUser = async (req, res) => {
  const { error } = validateCreateUser(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details[0].message });
  }

  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { error: idError } = validateId(userId);
  if (idError) {
    return res.status(400).json({
      message: "Invalid user ID",
      details: idError.details[0].message,
    });
  }

  const { error: validationError } = validateUpdateUser(req.body);
  if (validationError) {
    return res.status(400).json({
      message: "Validation error",
      details: validationError.details[0].message,
    });
  }

  try {
    const user = await userService.updateUser(userId, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const { error } = validateId(userId);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", details: error.details[0].message });
  }

  try {
    const user = await userService.deleteUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
