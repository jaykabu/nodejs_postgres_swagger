const {Subject} = require('../models');

exports.create_subject = async (req, res) => {
    try {
        const {name, description, status} = req.body;
        // console.log(req.body);
        const subject = await Subject.create({name, description, status});

        res.status(201).json(subject);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            error: err
        })
    }
}


exports.get_all_subject = async (req, res) => {
    try {
        const subject = await Subject.findAll();
        res.status(201).json(subject);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            error: err
        })
    }
}


exports.get_subject_byId = async (req, res) => {
    try {
        const id = req.params.subjectId;
        const subject = await Subject.findOne({
            where: {id}
        })

        res.status(200).json(subject)
    }catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


exports.delete_subject = async (req, res) => {
    try {
        const id = req.params.subjectId;
        const subject = await Subject.destroy({
            where: {id}
        })

        res.status(200).json(subject)
    }catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

