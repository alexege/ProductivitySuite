const mongoose = require("mongoose");

const Notebook = mongoose.model(
    "Notebook",
    new mongoose.Schema({
        title: String,
        description: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isPublic: { 
            type: Boolean, 
            default: true
        },
        subjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }],
    },
    { timestamps: true })
);

module.exports = Notebook;