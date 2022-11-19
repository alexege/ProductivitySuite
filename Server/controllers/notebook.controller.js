const db = require("../models");
const User = require("../models/user.model");
const Notebook = db.notebook;

exports.allNotebooks = (req, res) => {
  Notebook.find({}, (err, notebooks) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(notebooks);
  })
  .populate({ 
    path: "subjects", 
    populate: {
      path: "categories",
      model: 'Category',
      populate: {
        path: 'notes',
        model: 'Note',
        populate: {
          path: 'comments',
          model: 'Comment'
        }
      }
    }
  })
  .sort([["createdAt", "ascending"]]);
};

exports.addNotebook = (req, res) => {

  console.log("----- adding notebook [controller] ----- \n req.body:", req.body);

  console.log("user:", req.body.user);

  const notebook = new Notebook({
    title: req.body.title,
    author: req.body.user.id,
    // author: req.body.user,
    isPublic: req.body.isPublic
  });

  notebook.save((err, notebook) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // if (req.body.author) {
    //   console.log("author found!");
    //   User.findOne(
    //     {
    //       _id: { $in: req.body.author },
    //     },
    //     (err, author) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       notebook.author = author;
    //       // notebook.authorName = author;

    //       notebook.save((err) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
    //       });

    //       res.status(200).send({
    //         notebook
    //       });
    //     }
    //   );
    // }

    res.status(201).send(
        notebook
    )
  });
};

exports.deleteNotebook = (req, res) => {
  Notebook.deleteOne({ _id: req.params.id }, (err, notebook) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //Delete all votes related to that notebook
    res.status(200).send({ message: "notebook deleted!" });
  });
};

exports.toggleNotebookPrivacy = (req, res) => {
  Notebook.findOne({ _id: req.params.id }, (err, notebook) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    notebook.isPublic = !notebook.isPublic;
    notebook.save((err, notebook) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        notebook
      })
    });
  })
}

exports.updateNotebook = (req, res) => {
  const update = {
    title: req.body.notebook.title,
    isPublic: req.body.notebook.isPublic
  };

  Notebook.findByIdAndUpdate({ _id: req.params.id }, update, (err, notebook) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("findbyid and update notebook: ", notebook);
    }
    res.status(200).send({ message: "Notebook updated successfully" });
  });
};