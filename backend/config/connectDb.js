const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb+srv://fatmafatma:fatimazahra@cluster0.ufayv.mongodb.net/Project?retryWrites=true&w=majority");
    //await mongoose.connect("mongodb://localhost:27017/fatma");
    console.log("db successfully connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectdb;