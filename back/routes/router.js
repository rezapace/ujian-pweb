const express = require("express");
const { getUsers, Register, Login, Logout, editUsers, deleteUser } = require("../controllers/Users.js");
const { verifyToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/RefreshToken");
const { createData, deleteData, getDataById, getDatas, updateData } = require("../controllers/DataController.js");

const router = express.Router();

// Authenticate
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.patch("/users/:id", verifyToken, editUsers);
router.delete("/users/:id", verifyToken, deleteUser);

// CRUD Data
router.get("/datas", getDatas);
router.get("/datas/:id", getDataById);
router.post("/datas", createData);
router.patch("/datas/:id", updateData);
router.delete("/datas/:id", deleteData);

module.exports = router;
