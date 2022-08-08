const controller = require("../controllers/note.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Notes
app.get("/api/note/allNotes", controller.allNotes);
app.post("/api/note/addNote", controller.addNote);
app.post("/api/note/updateNote/:id", controller.updateNote);
app.delete("/api/note/deleteNote/:id", controller.deleteNote);

};