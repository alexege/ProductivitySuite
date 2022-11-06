const controller = require("../controllers/comment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Comments
app.get("/api/comment/allComments", controller.allComments);
app.post("/api/comment/addComment", controller.addComment);
app.post("/api/comment/updateComment/:id", controller.updateComment);
app.put("/api/comment/toggleCommentPrivacy/:id", controller.toggleCommentPrivacy);
app.delete("/api/comment/deleteComment/:id", controller.deleteComment);

};