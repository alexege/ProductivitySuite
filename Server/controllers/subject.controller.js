const db = require("../models");
const Notebook = require("../models/notebook.model");
const User = require("../models/user.model");
const Subject = db.subject;

exports.allSubjects = (req, res) => {
  Subject.find({}, (err, subjects) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(subjects);
  })
  .populate("categories")
  .sort([["createdAt", "descending"]]);
};

exports.addSubject = (req, res) => {
  console.log("[subject.controller] ", req.body);

  const subject = new Subject({
    title: req.body.title,
    isPublic: req.body.isPublic
  });

  subject.save((err, subject) => {
    if (err) {
      res.status(500).send({ message: err })
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

    //       subject.authorName = author;

    //       subject.save((err) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
    //       });

    //       res.status(200).send({
    //         name: subject.name,
    //         description: subject.description,
    //         author: author.username,
    //       });
    //     }
    //   );
    // }

    if (req.body.notebookId) {
      Notebook.findOne(
        { _id: { $in: req.body.notebookId },
      }, 
      (err, notebook) => {
        if(err) {
          res.status(500).send({ message: err });
          return;
        }
        
        notebook.subjects.push(subject);
        notebook.save();
        console.log("notebook:", notebook);
        // res.status(200).send({
        //   subject
        //  });
       });
    }
  })
    res.status(200).send(subject)
};

exports.deleteSubject = (req, res) => {

  Subject.deleteOne({ _id: req.params.id }, (err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //Delete all votes related to that subject
    res.status(200).send({ message: "subject deleted!" });
  });
};

exports.toggleSubjectPrivacy = (req, res) => {
  Subject.findOne({ _id: req.params.id }, (err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    subject.isPublic = !subject.isPublic;
    subject.save((err, subject) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        subject
      })
    });
  })
}

exports.updateSubject = (req, res) => {
  const update = {
    title: req.body.title,
    description: req.body.description,
    isPublic: req.body.isPublic
  };

  Subject.findByIdAndUpdate({ _id: req.params.id }, update, (err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("subject: ", subject);
    }
    res.status(200).send({ message: "Subject updated successfully" });
  });
};