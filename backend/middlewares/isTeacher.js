const isTeacher = (req, res, next) => {
  if (req.user.role == "teacher") {
    next();
  } else {
    res.status(401).send("you are not teacher");
  }
};

module.exports = isTeacher;
