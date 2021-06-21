const mongo = require("mongoose");

const Workshop = new mongo.Schema({
    users: {
        type: [String]
    },
    attendees: {
        type: [String]
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    venue: {
        type: String,
        require: true
    },
    image: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongo.model("Workshop",Workshop);