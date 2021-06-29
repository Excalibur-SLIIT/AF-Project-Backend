const paper = require("../models/ResearchPaper");

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

const create = async (req,res) => {
    const newPaper = new paper({
        topic: req.body.topic,
        description: req.body.description,
        author: req.body.author,
        file: req.file
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
};

module.exports = { get, create };