const payment = require("../models/Payment");
const user = require("../models/User");

const get = async (req,res) => {
    await user.findOne({_id: req.user.id })
    .then(async result => {
        if (result.role.toLoweCase() == "admin") {
            await payment.find()
            .then(rslt => {
                res.json({
                    status: "successful",
                    count: rslt.length,
                    results: rslt
                });
            })
            .catch(err => {
                res.json({
                    status: "error",
                    description: err
                });
            });
        }
    })
    .catch(err => {
        res.json({
            status: "error",
            description: err
        });
    });
};

const create = async (req,res) => {
    if (userValidate(req.user.id)) {
        const newPayment = new payment({
            user: req.user.id,
            amount: req.body.amount,
            date: req.body.date
        });
    
        await newPayment.save()
        .then(async result => {
            await user.findOneAndUpdate({_id: req.user.id}, { $set: { "attributes.paid": true}})
            .then(rslt => {
                if (rslt != null) {
                    res.json({
                        status: "successful",
                        results: result
                    });
                } else {
                    res.json({
                        status: "unsuccessful",
                        description: "user not found"
                    });
                }
            })
        })
        .catch(err => {
            res.json({
                status: "error",
                description: err
            });
        });
    } else {
        res.json({
            status: "unsuccessful",
            description: "User validation failed"
        });
    }
};

const getById = async (req,res) => {
    await payment.findOne({_id: req.params.id})
    .then(result => {
        res.json({
            status: "successful",
            results: result
        });
    })
    .catch(err => {
        res.json({
            status: "error",
            description: err
        });
    });
};

const userValidate = async (id) => {
    await user.findOne({_id: id })
    .then(result => {
        if ((result.role.toLowerCase == "attendee" || result.role.toLowerCase == "researcher") && result.attributes.paid != true) {
            return true;
        } else {
            return false;
        }
    })
    .catch(err => {
        res.json({
            status: "error",
            description: err
        });
        throw err;
    });
};

module.exports = { get, getById, create };