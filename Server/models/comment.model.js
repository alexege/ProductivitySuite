const mongoose = require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        title: String,
        body: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isPublic: { 
            type: Boolean, 
            default: true
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
            ref: 'Category'
        },
        note: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    },
    { timestamps: true })
);

module.exports = Comment;