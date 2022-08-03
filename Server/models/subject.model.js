const mongoose = require("mongoose");

const Subject = mongoose.model(
    "Subject",
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
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
    },
    { timestamps: true })
);

module.exports = Subject;