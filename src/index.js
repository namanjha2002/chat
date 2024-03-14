const mongoose = require("mongoose");
const express = require("express");
const route = require("./route/userRoute");
const app = express();
require('dotenv').config();
// console.log(process.env.mongodb)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.mongodb)
mongoose
  .connect(
   process.env.mongodb ,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
app.use(function (req, res) {
  return res.status(400).send({ status: false, message: "Path Not Found" });
});

app.listen(process.env.PORT || 1000, function () {
  console.log("Express app running on Port " + (process.env.PORT || 1000));
});
