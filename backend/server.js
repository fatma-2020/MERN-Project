const express = require("express");
const userRouter = require("./routes/userRoutes");
const subjectRouter = require("./routes/subjectRoutes");
const connectdb = require("./config/connectDb");
require("dotenv").config({ path: "./config/.env" });

const cors = require("cors");

const app = express();
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cors()); // Use this after the variable declaration
connectdb();
app.use("/subjects", subjectRouter);
app.use("/users", userRouter);
const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
