const user = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

const get = async (req, res) => {
    await user.find()
        .then(result => {
            if (Array.isArray(result) && result.length == 0) {
                res.json({
                    status: "unsuccessful",
                    description: "No records available"
                });
            } else {
                res.json({
                    status: "successful",
                    count: result.length,
                    results: result
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

const getUserById = async (req, res) => {
    await user.findOne({ _id: req.user.id }).select("-password")
        .then(result => {
            res.json({
                status: "successful",
                results: result
            });
        })
        .catch();
};

const create = async (req, res) => {
    await user.findOne({ username: req.body.username })
        .then(result => {
            if (result != null) {
                res.json({
                    status: "unsuccessful",
                    description: "A user exists with the provided username"
                });
            } else {
                const newUser = new user({
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role
                });
                await newUser.save()
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
                            error: err
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
        .catch(err => res.json({
            status: "error",
            err
        }));
}

const remove = async (req, res) => {
    await seller.findOneAndRemove({ _id: req.params.id })
        .then(result => res.status(200).json({
            status: "successful",
            results: result
        }))
        .catch(err => res.json({
            status: "error",
            err
        }));
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
            } else if (String(result.password) === req.body.password) {
                //Return jsonwebtoken
                const payload = ;
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
        .catch(err => res.json({
            status: "error",
            err
        }));
}

module.exports = { get, getUserById, create, update, remove, login };