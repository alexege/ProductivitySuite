const mongoose = require("mongoose");

const Note = mongoose.model(
    "Note",
    new mongoose.Schema({
        title: String,
        body: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isPublic: { 
            type: Boolean, 
            default: false
        },
        notebook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notebook'
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    { timestamps: true })
);

module.exports = Note;