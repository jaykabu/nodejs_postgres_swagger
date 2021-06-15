const {Section, Subject, Teacher, Course} = require('../models');

exports.create_section = async (req, res) => {
    try {
        const {teacherId, subjectId, courseId, status} = req.body;
        console.log(req.body);

        const section = await Section.create({teacherId, subjectId, courseId, status});
        console.log(section);

        res.status(201).json({
            message: 'Section created',
            section: section
        })
    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            error: err
        })
    }
};

exports.get_all_section = async (req, res) => {
    try {
        const section = await Section.findAll({
            include: [
                {
                    model: Subject,
                    required: true,
                    attributes: ['id', 'name', 'description', 'status']
                },
                {
                    model: Course,
                    required: true,
                    attributes: ['id', 'name', 'status']
                },
                {
                    model: Teacher,
                    required: true,
                    attributes: ['id', 'name', 'email', 'birthday', 'status']
                }
            ]
        });
        res.status(200).json(section)
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}