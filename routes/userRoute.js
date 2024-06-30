const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const admin = require("../lib/firebase.js");
const authenticateJWT = require("../lib/jwt.js"); // Adjust the path if needed

// add user

router.post("/", async (req, res) => {
  const { name, email, phone, whatsapp, course, status, stage } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      phone,
      whatsapp,
      course,
      status,
      stage,
    });

    const user = await newUser.save();
    res.json(user);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.errorResponse);
  }
});
// Firestore API
// firestore api
router.post("/signup", authenticateJWT, async (req, res, next) => {
  const { email, password, displayName } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.status(201).send({
      message: "User created successfully",
      user: userRecord,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ message: "Error creating user", error: error.message });
    next(error);
  }
});

// find all user
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send(err);
    next(err);
  }
});
// delete route--
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// find user --

router.get("/:id", async (req, res) => {
  try {
    const idUser = await User.findById(req.params.id);
    if (!idUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ data: idUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// update user --

router.put("/:id", async (req, res) => {
  const userToUpdate = req.body;
  try {
    const idUser = await User.findByIdAndUpdate(req.params.id, userToUpdate, {
      new: true,
    });
    if (!idUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user: idUser, msg: "user updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
