const {Course} = require('../models');

exports.create_course = async (req, res) => {
    try {
        const {name, status} = req.body;
        const course = await Course.create({name, status});

        res.status(201).json(course)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            error: err
        })
    }
};

exports.get_all_course = async (req, res) => {
    try {
        const course = await Course.findAll();
        res.status(200).json(course);
    }catch (e) {
        res.status(500).json({
            error: err
        })
    }
};


exports.get_course_byId = async (req, res) => {
    try {
        const id = req.params.courseId;
        const course = await Course.findOne({
            where: {id}
        });

        res.status(200).json(course)
    }catch (err) {
        res.status(500).json({
            error: err
        })
    }
};

exports.delete_course = async (req, res) => {
    try {
        const id = req.params.courseId;
        const course = await Course.destroy({
            where: {id}
        });

        res.status(200).json(course)
    }catch (e) {
        res.status(500).json({
            error: err
        })
    }
}