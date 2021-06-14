const {User} = require('../models');

exports.get_all_user = async (req, res) => {
    try {
        const user = await User.findAll();
        const response = {
            count: user.length,
            user: user.map(user => {
                return {
                    uuid: user.uuid,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    age: user.age,
                    address: user.address,
                    phone: user.phone,
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


exports.create_users = async (req, res) => {
    try {
        debugger
        await bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                throw err
            } else {
                const user = User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    age: req.body.age,
                    address: req.body.address,
                    phone: req.body.phone
                })
                res.status(201).json({
                    message: 'User created',
                    user: user
                });
            }
        })
    } catch (err) {
        res.status(500).json({
            error: err
            // error: err.errors[0].message,
        });
    }
};


exports.get_user_byId = async (req, res) => {
    try {
        const uuid = req.params.userId;
        const user = await User.findOne({where: {uuid}});
        if (!user) {
            res.status(404).json({
                message: 'UserId not found!'
            })
        } else {
            res.status(200).json({
                user: user
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};


exports.update_user = async (req, res) => {
    try {
        const uuid = req.params.userId;
        const {name, email, password, age, address, phone} = req.body;

        const user = await User.update({name, email, password, age, address, phone}, {where: {uuid}});
        res.status(200).json({
            message: 'Updated user',
            user
        })
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};


exports.delete_user = async (req, res) => {
    try {
        const uuid = req.params.userId;
        const user = await User.destroy({where: {uuid}});

        if (!user) {
            res.status(404).json({
                message: 'user already deleted'
            })
        } else {
            res.status(200).json({
                message: 'User deleted',
                user
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}