const paper = require("../models/ResearchPaper");
const user = require("../models/User");

const get = async (req,res) => {
    await paper.find()
    .then(results => {
        if (Array.isArray(results) && results.length > 0 ) {
            res.json({
                status: "successful",
                count: results.length,
                results: results
            });
        } else {
            res.json({
                status: "successful",
                description: "No research papers found"
            });
        }
    })
    .catch(err => {
        res.json({
            status: "error",
            description: err
        })
    });
};

const getById = async (req, res) => {
    await paper.findOne({_id: req.params.id})
    .then(results => {
        if (results != null) {
            res.json({
                status: "successful",
                results: results
            });
        } else {
            res.json({
                status: "successful",
                description: "No research papers found"
            });
        }
    })
    .catch(err => {
        res.json({
            status: "error",
            description: err
        })
    });
};

const create = async (req,res) => {
    if (userValidate(req.user.id,"researcher")) {
        const newPaper = new paper({
            topic: req.body.topic,
            description: req.body.description,
            author: req.body.author,
            file: req.file,
            status: "pending"
        });
    
        await newPaper.save()
        .then(results => {
            res.json({
                status: "successful",
                results: results
            });
        })
        .catch(err => {
            res.json({
                status: "error",
                description: err
            })
        });
    } else {
        res.json({
            status: "unsuccessful",
            description: "User validation failed"
        })
    }
    
};

const approve = async (req,res) => {
    if(userValidate(req.user.id, "reviewer")) {
        await paper.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "approved" } }).
        then(async result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "User not found"
                });
            } else {
                await user.findOneAndUpdate({_id: result.author}, { $set: { "attributes.fileStatus": "approved" } })
                await paper.findOne({ _id: req.params.id }).then(result => {
                    res.status(200).json({
                        status: "susccessful",
                        results: result
                    })
                })
            }
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
        })
    }
};

const decline = async (req,res) => {
    if(userValidate(req.user.id, "reviewer")) {
        await paper.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "declined" } }).
        then(async result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "User not found"
                });
            } else {
                await user.findOneAndUpdate({_id: result.author}, { $set: { "attributes.fileStatus": "approved" } })
                await paper.findOne({ _id: req.params.id }).then(result => {
                    res.status(200).json({
                        status: "susccessful",
                        results: result
                    })
                })
            }
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
        })
    }
};

const userValidate = async (id,role) => {
    await user.findOne({_id: id })
    .then(result => {
        if (result.role.toLowerCase == role) {
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

module.exports = { get, create, approve, decline };