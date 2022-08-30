const controller = require("../controllers/notebook.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Notebooks
app.get("/api/notebook/allNotebooks", controller.allNotebooks);
app.post("/api/notebook/addNotebook", controller.addNotebook);
app.post("/api/notebook/updateNotebook/:id", controller.updateNotebook);
app.delete("/api/notebook/deleteNotebook/:id", controller.deleteNotebook);
app.put("/api/notebook/toggleNotebookPrivacy/:id", controller.toggleNotebookPrivacy);

};