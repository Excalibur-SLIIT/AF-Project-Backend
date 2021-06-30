const mongo = require("mongoose");

const Payment = new mongo.Schema({
    user: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongo.Schema("Payment", Payment);