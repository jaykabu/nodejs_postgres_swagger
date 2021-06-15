const {Registration, Student, Section} = require('../models');

exports.create_registration = async (req, res) => {
    try {
        const {studentId, sectionId, status} = req.body;
        console.log(req.body);

        const registration = await Registration.create({studentId, sectionId, status});
        res.status(201).json(registration)
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
};

exports.get_all_registration = async (req, res) => {
    try {
        const register = await Registration.findAll({
            include: [
                {
                    model: Student,
                    required: true,
                    attributes: ['id', 'name', 'email', 'password', 'birthday', 'status']
                },
                {
                    model: Section,
                    required: true,
                }
            ]
        })
        console.log(register);

        res.status(200).json(register);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            error: err
        })
    }
}

exports.get_register_byId = async (req, res) => {
    try {
        const id = req.params.id;
        const register = await Registration.findOne({
            where: {id}
        });

        if (!register) {
            res.status(404).json({
                message: 'Not found!'
            });
        }

        res.status(200).json(register);
    } catch (err) {
        res.status(500).json({
            error: errqq
        })
    }
}