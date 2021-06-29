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
    const newPayment = new payment({
        attendee: req.user.id,
        amount: req.body.amount,
        date: req.body.date
    });

    await newPayment.save()
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

const getById = async (req,res) => {
    await payment.findOne({_id: req.body.id})
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