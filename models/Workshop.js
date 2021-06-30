const mongo = require("mongoose");

const Workshop = new mongo.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    conductor: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    venue: {
        type: String,
        require: true
    },
    proposal: {
        type: Object,
        require: true
    },
    status: {
        type: String,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongo.model("Workshop",Workshop);