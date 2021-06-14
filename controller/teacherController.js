const {Teacher} = require('../models');

exports.create_teacher = async (req, res) => {
    try {
        const {name, email, password, birthday, status} = req.body;

        const teacher = await Teacher.create({name, email, password, birthday, status});

        res.status(201).json({
            payload: teacher
        });
    } catch (err) {
        console.log("error", err)
        res.status(500).json({
            error: err
        });
    }
};

exports.get_all_teacher = async (req, res) => {
    try {
        const teacher = await Teacher.findAll();
        const response = {
            count: teacher.length,
            teachers: teacher.map(teacher => {
                return {
                    id: teacher.id,
                    name: teacher.name,
                    email: teacher.email,
                    password: teacher.password,
                    birthday: teacher.birthday.toLocaleDateString(),
                    status: teacher.status,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/teacher/" + teacher.id
                    }
                }
            })
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};


exports.get_teacher_byId = async (req, res) => {
    try {
        const id = req.params.teacherId;
        const teacher = await Teacher.findOne({
            where: {id}
        });

        if (!teacher) {
            res.status(404).json({
                message: 'Teacher Id not found!'
            })
        }

        res.status(200).json({
            teacher: {
                id: teacher.id,
                name: teacher.name,
                email: teacher.email,
                password: teacher.password,
                birthday: teacher.birthday.toLocaleDateString(),
                status: teacher.status,
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};

exports.update_teacher = async (req, res) => {
    try {
        const id = req.params.teacherId;
        const {name, email, password, birthday, status} = req.body;

        const teacher = await Teacher.update(
            {name, email, password, birthday, status},
            {where: {id}}
        );

        res.status(200).json({
            message: 'Updated teacher data',
            teacher: teacher
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};


exports.delete_teacher = async (req, res) => {
    try {
        const id = req.params.teacherId;

        const teacher = await Teacher.destroy({
            where: {id}
        })

        if (!teacher) {
            res.status(404).json({
                message: 'Teacher not found!'
            })
        }

        res.status(500).json({
            message: 'Deleted teacher',
            teacher: teacher
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}