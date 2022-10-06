const db = require("../models");
const Notebook = require("../models/notebook.model");
const Category = require("../models/category.model");
const User = require("../models/user.model");
const Note = db.note;

exports.allNotes = (req, res) => {
    // console.log("Attempting to get all notes:", req.body);
  Note.find({}, (err, note) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({note});
  })
//   .populate("comments")
  .sort([["createdAt", "descending"]]);
};

exports.addNote = (req, res) => {
    console.log("req.body:", req.body);
  const note = new Note({
    title: req.body.title,
    isPublic: req.body.isPublic
  });

  note.save((err, note) => {
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

    //       note.authorName = author;

    //       note.save((err) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
    //       });

    //       res.status(200).send({
    //         name: note.name,
    //         description: note.description,
    //         author: author.username,
    //       });
    //     }
    //   );
    // }

    if (req.body.categoryId) {
      Category.findOne(
        { _id: { $in: req.body.categoryId },
      }, 
      (err, category) => {
        if(err) {
          res.status(500).send({ message: err });
          return;
        }

        category.notes.push(note);
        category.save();
        // res.status(200).send({
        //   note
        //  });
       });
    }
  })
    res.status(200).send(note);
};

exports.deleteNote = (req, res) => {

  Note.deleteOne({ _id: req.params.id }, (err, note) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //Delete all votes related to that note
    res.status(200).send({ message: "note deleted!" });
  });
};

exports.updateNote = (req, res) => {
  const update = {
    title: req.body.title,
    description: req.body.description,
    isPublic: req.body.isPublic
  };

  Note.findByIdAndUpdate({ _id: req.params.id }, update, (err, note) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("note: ", note);
    }
    res.status(200).send({ message: "Note updated successfully" });
  });
};