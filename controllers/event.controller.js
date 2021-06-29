const event = require("../models/Event");

const get = async (req, res) => {
    await event.find()
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
                    description: "No events available"
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
    await event.findOne({ _id: req.params.id })
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

const create = async (req, res) => {
    const newEvent = new event({
        name: req.body.name,
        speaker: req.body.speaker,
        topic: req.body.topic,
        date: req.body.date,
        time: req.body.time,
    });

    await event.find({ name: newEvent.name })
        .then(results => {
            if (Array.isArray(results) && results.length > 0) {
                res.json({
                    status: "unsuccessfull",
                    description: "Event name already exists"
                });
            } else {
                newEvent.save().
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
}

const update = async (req, res) => {
    await event.findOneAndUpdate({ _id: req.params.id }, req.body).
        then(result => {
            if (result == null) {
                res.json({
                    status: "unsuccessful",
                    description: "Event not found"
                });
            } else {
                event.findOne({ _id: req.params.id }).then(result => {
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
    await event.findOneAndRemove({ _id: req.params.id })
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


module.exports = { get, getById, create, update, remove };