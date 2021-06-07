const user = require("../models/User");

const get = async (req,res) => {
    await user.find()
    .then(result => {
        res.json({
            status: "successful",
            results: result
        });
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err
        });
    });
};

module.exports = { get };