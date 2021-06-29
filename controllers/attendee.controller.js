const user = require("../models/User");

const payment = async (req,res) => {
    await user.findOne({_id: req.user.id})
    .then(result => {
        if (result.role.toLowerCase() == "attendee") {
            user.findByIdAndUpdate({_id: req.user.id}, {$set: {}})
        } else {
            res.json({
                status: "unsuccessfull",
                description: "User validation failed"
            });
        }
    });
}; 