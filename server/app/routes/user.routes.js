const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //  user routes
  app.get("/api/user/jobs", [authJwt.verifyToken], controller.getJobs);
  app.get("/api/user/job/:jobId", [authJwt.verifyToken], controller.getJob);
  app.post("/api/user/job/apply", [authJwt.verifyToken], controller.applyJob);
  app.get("/api/user/applied/:jobId", [authJwt.verifyToken], controller.getAppliedJob);



  //admin routes
  app.use("/api/admin/*",
    [authJwt.verifyToken, authJwt.isAdmin]
  );

  // categories routes 
  app.post("/api/admin/category",controller.createCatgory);
  app.get("/api/admin/categories",controller.getCategories);
  app.get("/api/admin/category/:categoryId",controller.getCategory);

  // job routes 
  app.post("/api/admin/job",controller.createJob);
  app.get("/api/admin/jobs",controller.getJobs);

  // applications routes 
  app.get("/api/admin/applications",controller.getApplications);
  app.get("/api/admin/application/:applicationId",controller.getApplication);
  app.put("/api/admin/application/:applicationId",controller.upadteApplication);

};
