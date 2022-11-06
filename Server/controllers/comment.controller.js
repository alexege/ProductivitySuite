const db = require("../models");
const Commentbook = require("../models/notebook.model");
const Category = require("../models/category.model");
const User = require("../models/user.model");
const Note = require("../models/note.model");
const Comment = db.comment;

exports.allComments = (req, res) => {
    // console.log("Attempting to get all comments:", req.body);
  Comment.find({}, (err, comment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ comment });
  })
//   .populate("comments")
  .sort([["createdAt", "descending"]]);
};

exports.addComment = (req, res) => {
    console.log("req.body:", req.body);
  const comment = new Comment({
    title: req.body.comment.title,
    isPublic: req.body.isPublic
  });

  comment.save((err, comment) => {
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

    //       comment.authorName = author;

    //       comment.save((err) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
    //       });

    //       res.status(200).send({
    //         name: comment.name,
    //         description: comment.description,
    //         author: author.username,
    //       });
    //     }
    //   );
    // }

    console.log("req.body:", req.body);

    if (req.body.noteId) {
      Note.findOne(
        { _id: { $in: req.body.noteId },
      }, 
      (err, note) => {
        if(err) {
          res.status(500).send({ message: err });
          return;
        }

        note.comments.push(comment);
        note.save();
        // res.status(200).send({
        //   comment
        //  });
       });
    }
  })
    res.status(200).send({
        comment
  });
};

exports.deleteComment = (req, res) => {

  Comment.deleteOne({ _id: req.params.id }, (err, comment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //Delete all votes related to that comment
    res.status(200).send({ message: "comment deleted!" });
  });
};

exports.toggleCommentPrivacy = (req, res) => {
  Comment.findOne({ _id: req.params.id }, (err, comment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    comment.isPublic = !comment.isPublic;
    comment.save((err, comment) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        comment
      })
    });
  })
}

exports.updateComment = (req, res) => {
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  const update = {
    title: req.body.comment.title,
    isPublic: req.body.comment.isPublic
  };

  Comment.findByIdAndUpdate({ _id: req.params.id }, update, (err, comment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("comment: ", comment);
    }
    res.status(200).send({ message: "Comment updated successfully" });
  });
};