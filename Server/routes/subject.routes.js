const controller = require("../controllers/subject.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Subjects
app.get("/api/subject/allSubjects", controller.allSubjects);
app.post("/api/subject/addSubject", controller.addSubject);
app.post("/api/subject/updateSubject/:id", controller.updateSubject);
app.delete("/api/subject/deleteSubject/:id", controller.deleteSubject);
app.put("/api/subject/toggleSubjectPrivacy/:id", controller.toggleSubjectPrivacy);

};