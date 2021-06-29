const mongo = require("mongoose");

const paper = mongo.Schema({
    topic: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    file: {
        type: Object,
        require: true
    }
}); 

module.exports = mongo.model("ResearchPaper", paper);