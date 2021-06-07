const mongo = require("mongoose");

const User = new mongo.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongo.model("User",User);