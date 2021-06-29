const mongo = require("mongoose");

const Log = new mongo.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
});

module.exports = mongo.model("Log", Log);