const user = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const get = async (req, res) => {
    await user.find({}).select("-password")
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
                    description: "No users available"
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

const getUserById = async (req,res) => {
    await user.findOne({ _id: req.params.id }).select("-password")
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
}

const authUser = async (req, res) => {
    await user.findOne({ _id: req.user.id }).select("-password")
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

const create = async (req, res) => {
    await user.findOne({ username: req.body.username })
        .then(async result => {
            if (result != null) {
                res.json({
                    status: "unsuccessful",
                    description: "A user exists with the provided username"
                });
            } else {
                var temp = {
                    username: req.body.username,
                    role: req.body.role.toLowerCase(),
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    profileImg: req.file
                };

                const salt = await bcrypt.genSalt(10);
                temp.password = await bcrypt.hash(req.body.password, salt);

                if (temp.role.toLowerCase() === "attendee") {
                    temp.attributes = {
                        paid: false
                    };
                } else if (temp.role.toLowerCase() === "researcher") {
                    temp.attributes = {
                        paid: false,
                        fileStatus: "pending"
                    }
                }

                const newUser = new user(temp);

                newUser.save()
                    .then((result) => {
                        jwt.sign(
                            {
                                user: {
                                    id: result.id,
                                },
                            },
                            config.get("jwtsecret"),
                            {
                                expiresIn: 3600
                            },
                            (err, token) => {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    res.json({
                                        status: "successfull",
                                        token
                                    });
                                }
                            }
                        );
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
                error: err
            });
        });
};

const update = async (req, res) => {
    await user.findOneAndUpdate({ _id: req.params.id }, req.body).
        then(result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "User not found"
                });
            } else {
                user.findOne({ _id: req.params.id }).then(result => {
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
}

const remove = async (req, res) => {
    await user.findOneAndRemove({ _id: req.params.id })
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

const login = async (req, res) => {
    await user.findOne({ "username": req.body.username })
        .then(result => {
            if (result === null) {
                res.status(404);
                res.json({
                    status: "unsuccessful",
                    description: "User not available"
                });
            } else if (bcrypt.compareSync(req.body.password,result.password)) {
                jwt.sign(
                    {
                        user: {
                            id: result.id,
                        },
                    },
                    config.get("jwtsecret"),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );
            } else {
                res.status(404);
                res.json({
                    status: "unsuccessful",
                    description: "Password is wrong, Try again"
                });
            }
        })
        .catch(err => {
            res.json({
                status: "error",
                description: err
            });
        });
}

module.exports = { get, getUserById, authUser, create, update, remove, login };