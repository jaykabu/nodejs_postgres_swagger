const {Student} = require('../models');


exports.create_student = async (req, res) => {
    try {
        const {name, email, password, birthday, status} = req.body;

        const student = await Student.create({name, email, password, birthday, status});

        res.status(201).json({
            payload: student
        });
    } catch (err) {
        console.log("error", err)
        res.status(500).json({
            error: err
        });
    }
};


exports.get_all_students = async (req, res) => {
    try {
        const student = await Student.findAll();
        const response = {
            count: student.length,
            students: student.map(student => {
                return {
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    password: student.password,
                    birthday: student.birthday.toLocaleDateString(),
                    status: student.status,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/teacher/" + student.id
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
}


exports.get_students_byId = async (req, res) => {
    try {
        const id = req.params.studentId;
        const student = await Student.findOne({
            where: {id}
        });

        if (!student) {
            res.status(404).json({
                message: 'Student Id not found!'
            })
        }

        res.status(200).json({
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                password: student.password,
                birthday: student.birthday.toLocaleDateString(),
                status: student.status,
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.update_students = async (req, res) => {
    try {
        const id = req.params.studentId;
        const {name, email, password, birthday, status} = req.body;

        const student = await Student.update(
            {name, email, password, birthday, status},
            {where: {id}}
        );

        res.status(200).json({
            message: 'Updated student data',
            student: student
        });
    }catch (err) {
        res.status(500).json({
            error: err
        });
    }
};

exports.delete_student = async (req, res) => {
    try {
        const id = req.params.studentId;

        const student = await Student.destroy({
            where: {id}
        })

        if (!student) {
            res.status(404).json({
                message: 'Student not found!'
            })
        }

        res.status(500).json({
            message: 'Deleted student',
            student: student
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}