const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    status: String,
    coverLetter: String,
    adminMessage:String,
    appliedOn:Date,
    resume:String
  })
);

module.exports = Application;
