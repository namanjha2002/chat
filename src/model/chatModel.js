const mongoose = require("mongoose");

// Create User schema
let chatSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("chat", chatSchema);
