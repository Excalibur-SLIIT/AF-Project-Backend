const workshop = require("../models/Workshop");
const user = require("../models/User");

const get = async (req, res) => {
    await workshop.find()
        .then(result => {
            if (Array.isArray(result) && result.length > 0) {
                res.json({
                    status: "successful",
                    count: result.length,
                    results: result
                });
            } else {
                res.json({
                    status: "unsuccessful",
                    description: "No Workshops available"
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
    await workshop.findOne({ _id: req.params.id })
        .then(result => {
            if (result != null) {
                res.json({
                    status: "success",
                    results: result
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
    if (userValidate(req.user.id,"workshop-conductor")) {
        const newWorkshop = new workshop({
            name: req.body.name,
            description: req.body.description,
            conductor: req.user.id,
            time: req.body.time,
            date: req.body.date,
            venue: req.body.venue,
            proposal: req.file,
            status: "pending"
        });
    
        await workshop.find({ name: newWorkshop.name})
        .then(results => {
            if (Array.isArray(results) && results.length > 0 ) {
                res.json({
                    status: "unsuccessfull",
                    description: "Workshop name already exists"
                });
            } else {
                newWorkshop.save().
                then(result => {
                    res.json({
                        status: "successfull",
                        results: result
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
    } else {
        res.json({
            status: "unsuccessful",
            description: "User validation failed"
        });
    }
}

const update = async (req, res) => {
    await workshop.findOneAndUpdate({ _id: req.params.id }, req.body).
        then(result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "User not found"
                });
            } else {
                workshop.findOne({ _id: req.params.id }).then(result => {
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
};

const remove = async (req, res) => {
    await workshop.findOneAndRemove({ _id: req.params.id })
        .then(result => res.status(200).json({
            status: "successful",
            results: result
        }))
        .catch(err => {
            res.json({
                status: "error",
                description: err
            });
        });
};

const approve = async (req,res) => {
    if(req.user.id, "editor") {
        await workshop.findOneAndUpdate({ _id: req.params.id }, { $set: { proposal: "approved" } }).
        then(result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "User not found"
                });
            } else {
                workshop.findOne({ _id: req.params.id }).then(result => {
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
    if(req.user.id, "editor") {
        await workshop.findOneAndUpdate({ _id: req.params.id }, { $set: { proposal: "declined" } }).
        then(result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "User not found"
                });
            } else {
                workshop.findOne({ _id: req.params.id }).then(result => {
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
        if (result.role.toLowerCase == role.toLowerCase()) {
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
// const register = async (req,res) => {
//     const document = {
//         "$push": { attendees: req.body.attendee }
//     }

//     await workshop.find({
//         _id: req.body.id,
//         attendees: [req.body.attendee]
//     }).then(result => {
//         if (result.length <= 0) {
//             workshop.findOneAndUpdate({ _id: req.body.id }, document)
//             .then(r => {
//                 res.json({
//                     status: "successful",
//                     reuslt: r
//                 });
//             });
//         } else {
//             res.json({
//                 status: "unsuccessful",
//                 description: "User already enrolled"
//             });
//         }
//     })
// }

// const unregister = async (req,res) => {
//     const document = {
//         "$pull": { attendees: req.body.attendee }
//     }

//     await workshop.find({
//         _id: req.body.id,
//         attendees: [req.body.attendee]
//     }).then(result => {
//         if (result.length > 0) {
//             workshop.findOneAndUpdate({ _id: req.body.id }, document)
//             .then(r => {
//                 res.json({
//                     status: "successful",
//                     reuslt: r
//                 });
//             });
//         } else {
//             res.json({
//                 status: "unsuccessful",
//                 description: "User already enrolled"
//             });
//         }
//     })
// };

module.exports = { get, getById, create, update, remove, approve, decline  };