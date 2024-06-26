const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/worko/users", userController.getUsers);
router.get("/worko/user/:userId", userController.getUserById);
router.post("/worko/user", userController.createUser);
router.patch("/worko/user/:userId", userController.updateUser);
router.delete("/worko/user/:userId", userController.deleteUser);

module.exports = router;
