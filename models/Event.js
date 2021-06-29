const mongo = require("mongoose");

const Event = new mongo.Schema({
    name: {
        type: String,
        require: true
    },
    speaker: {
        type: String,
        require: true
    },
    topic: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        require: true,
    },

});

module.exports = mongo.model("Event", Event);