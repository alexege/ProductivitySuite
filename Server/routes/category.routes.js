const controller = require("../controllers/category.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Categories
app.get("/api/category/allCategories", controller.allCategories);
app.post("/api/category/addCategory", controller.addCategory);
app.post("/api/category/updateCategory/:id", controller.updateCategory);
app.delete("/api/category/deleteCategory/:id", controller.deleteCategory);

};