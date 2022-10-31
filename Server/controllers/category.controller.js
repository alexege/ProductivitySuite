const db = require("../models");
const Notebook = require("../models/notebook.model");
const Subject = require("../models/subject.model");
const User = require("../models/user.model");
const Category = db.category;

exports.allCategories = (req, res) => {
  Category.find({}, (err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ category });
  })
//   .populate("comments")
  .sort([["createdAt", "descending"]]);
};

exports.addCategory = (req, res) => {
  const category = new Category({
    title: req.body.title,
    isPublic: req.body.isPublic
  });

  category.save((err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // if (req.body.author) {
    //   User.findOne(
    //     {
    //       _id: { $in: req.body.author },
    //     },
    //     (err, author) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       category.authorName = author;

    //       category.save((err) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
    //       });

    //       res.status(200).send({
    //         name: category.name,
    //         description: category.description,
    //         author: author.username,
    //       });
    //     }
    //   );
    // }

    console.log("the id of the subject is: ", req.body.subjectId);

    if (req.body.subjectId) {
      Subject.findOne(
        { _id: { $in: req.body.subjectId },
      }, 
      (err, subject) => {
        if(err) {
          res.status(500).send({ message: err });
          return;
        }

        subject.categories.push(category);
        subject.save();
        // res.status(200).send({
        //   category
        //  });
       });
    }
  })
    res.status(200).send({
        category
  });
};

exports.deleteCategory = (req, res) => {

  Category.deleteOne({ _id: req.params.id }, (err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //Delete all votes related to that category
    res.status(200).send({ message: "category deleted!" });
  });
};

exports.toggleCategoryPrivacy = (req, res) => {
  Category.findOne({ _id: req.params.id }, (err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    category.isPublic = !category.isPublic;
    category.save((err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        category
      })
    });
  })
}

exports.updateCategory = (req, res) => {
  const update = {
    title: req.body.title,
    description: req.body.description,
    isPublic: req.body.isPublic
  };

  Category.findByIdAndUpdate({ _id: req.params.id }, update, (err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("category: ", category);
    }
    res.status(200).send({ message: "Category updated successfully" });
  });
};