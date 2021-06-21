const mongo = require("mongoose");

const Payment = new mongo.Schema({
    conference: {
        type: String,
        require: true
    },
    attendee: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongo.Schema("Payment", Payment);