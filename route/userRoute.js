const express = require('express').Router;
const router = express();

const {User} = require('../models');


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - age
 *          - address
 *          - phone
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the user.
 *          name:
 *            type: string
 *            description: The name of the user
 *          email:
 *            type: string
 *            description: The email of the user
 *          password:
 *            type: string
 *            description: The password of the user
 *          age:
 *            type: string
 *            description: The age of the user
 *          address:
 *            type: string
 *            description: The address of the user
 *          phone:
 *            type: string
 *            description: The phone of the user
 *        example:
 *           name: jay
 *           email: jay@gmail.com
 *           password: jay123#
 *           age: 23
 *           address: surat
 *           phone: 1234567890
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage your users.
 */

/**
 * @swagger
 *  /user:
 *    get:
 *      summary: Lists of the all user
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: The lists of user
 */
router.get('/', async (req, res) => {
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
})

/**
 * @swagger
 * /user:
 *  post:
 *    summary: Add a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *    responses:
 *      '200':
 *        description: ok
 */
router.post('/', async (req, res) => {
    try {
        const {name, email, password, age, address, phone} = req.body;
        const user = await User.create({name, email, password, age, address, phone})
        res.status(201).json({
            message: 'User created',
            user: user
        });
    } catch (err) {
        res.status(500).json({
            error: err
            // error: err.errors[0].message,
        });
    }
});


/**
 * @swagger
 *  /user/{userId}:
 *    get:
 *      summary: Get a user by ID
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *      responses:
 *        '200':
 *          description: A single user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get('/:userId', async (req, res) => {
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
});


/**
 * @swagger
 * /user/{userId}:
 *  patch:
 *    summary: Add a new user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *    responses:
 *      '200':
 *        description: updated user successfully.
 */
router.patch('/:userId', async (req, res) => {
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
});


/**
 * @swagger
 *  /user/{userId}:
 *    delete:
 *      summary: Delete a user by ID
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *      responses:
 *        '200':
 *          description: Delete user successfully.
 */
router.delete('/:userId', async (req, res) => {
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
})


module.exports = router;
