const mongo = require("mongoose");

const Conference = new mongo.Schema({
    attendees: {
        type: [String]
    },
    name: {
        type: String,
        require: true
    },
    venue: {
        type: String,
        require: true 
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "pending"
    },
    createdBy: {
        type: String,
        require: true
    },
    resource: {
        type: String,
        require: true
    }
});

module.exports = mongo.model("Conference", Conference);