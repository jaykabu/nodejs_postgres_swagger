/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - age
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         age:
 *           type: string
 *           description: The user age
 *         address:
 *           type: string
 *           description: The user address
 *         phone:
 *           type: string
 *           description: The user phone number
 *       example:
 *         id: d5fE_asz
 *         name: The New Turing Omnibus
 *         email: jay@gmail.com
 *         password: jay123#
 *         age: 23
 *         address: Alexander
 *         phone: 1234567890
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
