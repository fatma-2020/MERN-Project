const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "first name is required"] },
  lastName: { type: String, required: [true, "last name is required"] },
  birthday: { type: String },
  gender: {
    type: String,
    enum: ["female", "male"],
    // required: [true, "gender is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
  },

  role: {
    type: String,
    enum: ["teacher", "student","admin"],
    required: [true, "role is required"],
  },
  specialityOrClass: String,
  photo: {
    type: String,
    default:
      "https://www.istockphoto.com/illustrations/insurance-agent-on-computer",
  },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
  bio: String,
  password: String,
});
module.exports = User = mongoose.model("user", userSchema);
