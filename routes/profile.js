"use strict";

const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getProfileById);
router.post("/", ProfileController.createProfile);

module.exports = router;
