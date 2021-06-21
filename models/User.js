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
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
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