const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../utils/multer");

const {
  registerRules,
  loginRules,
  validator,
} = require("../middlewares/validator");
const router = express.Router();

//register user:
router.post(
  "/registeruser",
  upload("users").single("file"),
  registerRules(),
  validator,
  async (req, res) => {
    const { email, password } = req.body;
    const { file } = req;

    const url = `${req.protocol}://${req.get("host")}`;

    try {
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res
          .status(400)
          .send({ msg: "user already exist, please login" });
      }

      const newUser = new User({ ...req.body });
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;
      newUser.photo = `${url}/${file.path}`;
      await newUser.save();
      res.send({ msg: "user successfully registred", newUser, file });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

//login
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const isMatched = await bcrypt.compare(password, existedUser.password);
    if (!isMatched) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const payload = { idUser: existedUser._id };
    const token = await jwt.sign(payload, "mySecretFatma");
    res.send({ user: existedUser, token });
  } catch (error) {
    console.log(error);
  }
});

router.get("/currentUser", isAuth(), (req, res) => {
  console.log(req.user);
  res.send(req.user);
});
router.get("/allUsers", 
isAuth(), 
isAdmin, 
async (req, res) => {
 
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put(
  "/profile/:id",
  upload("users").single("file"),
  // isAuth(),
  async (req, res) => {
    try {
      const url = `${req.protocol}://${req.get("host")}`;
      const { firstName, lastName, bio } = req.body;
      const { file } = req;
      if (file) {
        const f = `${url}/${file.path}`;
        const result = await User.updateOne(
          { _id: req.params.id },
          {
            $set: { photo: f, firstName, lastName, bio, updatedOn: Date.now() },
          }
        );
        const userUpdated = await User.findOne({ _id: req.params.id });

        if (result.modifiedCount) {
          return res.send({ msg: "USER updated ", userUpdated });
        }
        res.status(400).send({ msg: "already updated", userUpdated });
        console.log(subjectUpdated);
      } else {
        const result = await User.updateOne(
          { _id: req.params.id },
          { $set: { firstName, lastName, bio, updatedOn: Date.now() } }
        );
        const userUpdated = await User.findOne({ _id: req.params.id });

        if (result.modifiedCount) {
          return res.send({ msg: "USER updated ", userUpdated });
        }
        res.status(400).send({ msg: "already updated", userUpdated });
        console.log(subjectUpdated);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("failed to update");
    }
  }
);

router.put(
  "/changepassword/:id",
  // isAuth(),
  async (req, res) => {
    console.log(req.body);
    try {
      const { actualpass, newpass } = req.body;
      const userBefore = await User.findOne({ _id: req.params.id });
      const isMatched = await bcrypt.compare(actualpass, userBefore.password);
      //IS IT MATCHED ?
      if (!isMatched) {
        return res.status(400).send({ msg: "Wrong password !" });
      }
      //CRYPT THE PASSWORD
      const newhashedPassword = await bcrypt.hash(newpass, 10);

      //UPDATE THE USER PASSWORD
      const result = await User.updateOne(
        { _id: req.params.id },
        { $set: { password: newhashedPassword, updatedOn: Date.now() } }
      );

      //SEND THE UPDATED USER
      const userUpdated = await User.findOne({ _id: req.params.id });

      if (result.modifiedCount) {
        return res.send({ msg: "User updated ", userUpdated });
      }
      res.status(400).send({ msg: "already updated" });
    } catch (error) {
      console.log(error);
      res.status(400).send("failed to update");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const userDeleted = await User.deleteOne({ _id: req.params.id });
    if (userDeleted.deletedCount) {
      return res.send({ msg: "user deleted " });
    }
    res.status(400).send({ msg: "already deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send("failed to delete");
  }
});

module.exports = router;
