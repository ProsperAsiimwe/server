"use strict";

const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/user");

// Get all users
userRouter.get("/", UserController.getAllUsers);

// Create a new user
userRouter.post("/", UserController.createUser);

module.exports = userRouter;
