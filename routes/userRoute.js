const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// add user

router.post("/", async (req, res) => {
  const { firstName, lastName, phone, email, leadSource, leadStatus, note } =
    req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      leadSource,
      leadStatus,
      note,
    });

    const user = await newUser.save();
    res.json(user);
    console.log(user);
  } catch (err) {
    res.status(500).send(err.errorResponse);
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
