const mongoose = require("mongoose");

// Create User schema
let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password:{type :String,required:true},
    isOnline: {type: String ,
    enum: ["yes", "no"]}
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
