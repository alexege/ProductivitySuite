const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        title: String,
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
        notes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }]
    },
    { timestamps: true })
);

module.exports = Category;