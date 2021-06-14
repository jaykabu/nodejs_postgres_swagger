const express = require('express').Router;
const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = require('../controller/usercontroller');
const checkAuth = require('../middleware/check-auth');

const router = express();


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
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: The lists of user
 */
router.get('/', checkAuth, UserController.get_all_user);

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
router.post('/', UserController.create_users);


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
router.get('/:userId', UserController.get_user_byId);


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
router.patch('/:userId', UserController.update_user);


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
router.delete('/:userId', UserController.delete_user);



router.post('/login', async (req, res) => {
    try {
        debugger
        const {email, password} = req.body;

        const user = await User.findOne({
            where: {email}
        });

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = await jwt.sign({
                    email: user.email,
                    userId: user.uuid
                },
                'secret',
                {
                    expiresIn: '1h'
                },
            );
            res.status(200).json({
                message: 'Login successfully.',
                token: token
            })
        } else {
            res.status(200).json({
                message: 'Email and Password wrong!'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Email and Password wrong!'
        })
    }
});


module.exports = router;
