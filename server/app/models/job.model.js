const mongoose = require("mongoose");

const Job = mongoose.model(
  "Job",
  new mongoose.Schema({
    tittle: String,
    company: String,
    minExperience: Number,
    maxExperience: Number,
    description: String,
    tags:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],

    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    salary:Number,

  })
);

module.exports = Job;
