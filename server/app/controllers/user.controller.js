const db = require("../models");

const User = db.user;
const Role = db.role;
const Application = db.application;
const Job = db.job;
const Category = db.category;
const Tag = db.tag;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


//  categories controller
exports.createCatgory = (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  });

  category.save((err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send( category );
      return;
    }
  })
};

exports.getCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send(categories);
      return;
    }
  })
};

exports.getCategory = (req, res) => {
  Category.find({
    _id:req.params.categoryId
  }).exec((err, category) => {
    if (category) {
      res.status(200).send(category);
      return;
    }
    res.status(500).send({ message: "Unknown error" });
      return;
    });
};


//  Jobs controller
exports.createJob = (req, res) => {
  const job = new Job({
    tittle: req.body.title,
    description: req.body.description,
    companyName:req.body.companyName,
    minExperience:parseInt(req.body.minExperience) ,
    maxExperience:parseInt(req.body.maxExperience),
    salary:parseInt(req.body.salary),
    category:req.body.category
  });

  job.save((err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send( job );
      return;
    }
  })
};

exports.getJobs = (req, res) => {
  Job.find().exec((err, jobs) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send(jobs);
      return;
    }
  })
};

exports.getJob = (req, res) => {
  Job.findOne({
    _id:req.params.jobId
  }).exec((err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send(job);
      return;
    }
  })
};


//  applications
exports.getAppliedJob = (req, res) => {
  Application.findOne({
    job:req.params.jobId,
    user:req.userId
  }).exec((err, jobApplication) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      console.log(req.params.jobId, req.userId ,jobApplication)
      res.status(200).send(jobApplication);
      return;
    }
  })
};

exports.applyJob = (req, res) => {
  console.log(req.body)
  const application = new Application({
    user:req.userId,
    job:req.body.jobId,
    status:"applied",

  });

  application.save((err, job) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send( job );
      return;
    }
  })
};

exports.getApplications = (req, res) => {
  Application.find().populate("job").populate("user").exec((err, applications) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send(applications);
      return;
    }
  })
};
exports.getApplication = (req, res) => {
  Application.findOne({
    _id:req.params.applicationId
  }).exec((err, applications) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send(applications);
      return;
    }
  })
};

exports.upadteApplication = (req, res) => {
  Application.findById(req.params.id, function(err, application) {
    if (!application)
      return next(new Error('Could not load Document'));
    else {
      application.status = req.body.status;
      application.save(function(err, updatedApplication) {
        if (err)
          console.log('error')
        else
          res.status(200).send(updatedApplication);
      });
    }
  });
};




