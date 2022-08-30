const express = require("express");
const Subject = require("../models/Subject");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const upload = require("../utils/multer2");
const isTeacher = require("../middlewares/isTeacher");

router.post(
  "/addsubject",
  upload("subjects").single("file"),
  isAuth(),
  isTeacher,
  async (req, res) => {
    const url = `${req.protocol}://${req.get("host")}`;
    const { file } = req;
    try {
      const searchSubject = await Subject.findOne({ title: req.body.title });
      // if (searchSubject) {
      //   return res.status(400).send({ msg: "name must be unique" });
      // }
      const newSubject = new Subject({ ...req.body });

      newSubject.file = `${url}/${file.path}`;
      await newSubject.save();
      res.send({ newSubject, msg: "the Subject is successfully added" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);
router.get("/", isAuth(),async (req, res) => {
  try {
    const allSubjects = await Subject.find({
      category: { $regex: req.query.category||"", $options: "i" },
      title: { $regex: req.query.title||"", $options: "i" },
      speciality: {
        $regex:req.query.speciality||"",
        $options: "i",
      },
      class: {
        $regex: req.query.class||"",
        $options: "i",
      },
    });
    res.send(allSubjects);
  } catch (error) {
    console.log(error);
    res.status(400).send("failed to get");
  }
});
router.get("/mysubs", async (req, res) => {
  try {
    const allSubjects = await Subject.find().populate("user");
    res.send(allSubjects);
  } catch (error) {
    console.log(error);
    res.status(400).send("failed to get");
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const subjectDeleted = await Subject.deleteOne({ _id: req.params.id });
    if (subjectDeleted.deletedCount) {
      return res.send({ msg: "subject deleted " });
    }
    res.status(400).send({ msg: "already deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send("failed to delete");
  }
});
router.put(
  "/:id",
  upload("subjects").single("file"),
  // isAuth(),
  // isTeacher,
  async (req, res) => {
    try {
      const url = `${req.protocol}://${req.get("host")}`;
      const { title, category } = req.body;
      const { file } = req;
      const c = req.body.class;
      if (file) {
        const f = `${url}/${file.path}`;
        console.log(f);
        const result = await Subject.updateOne(
          { _id: req.params.id },
          { $set: { file: f, title, category, class: c, updated: Date.now() } }
        );
        const subjectUpdated = await Subject.findOne({ _id: req.params.id });

        if (result.modifiedCount) {
          return res.send({ msg: "Subject updated ", subjectUpdated });
        }
        res.status(400).send({ msg: "already updated", subjectUpdated });
        console.log(subjectUpdated);
      } else {
        const result = await Subject.updateOne(
          { _id: req.params.id },
          { $set: { title, category, class: c, updated: Date.now() } }
        );
        const subjectUpdated = await Subject.findOne({ _id: req.params.id });

        if (result.modifiedCount) {
          return res.send({ msg: "Subject updated ", subjectUpdated });
        }
        res.status(400).send({ msg: "already updated", subjectUpdated });
        console.log(subjectUpdated);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(`failed to update`);
    }
  }
);
router.get("/details/:id", async (req, res) => {
  try {
    const oneSubject = await Subject.findOne({ _id: req.params.id });
    res.send({ oneSubject });
  } catch (error) {
    console.log(error);
    res.status(400).send("failed to get the Subject");
  }
});

module.exports = router;
