const express = require('express').Router;
const StudentController = require('../controller/studentController');

const router = express();
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - birthday
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the teacher.
 *         name:
 *           type: string
 *           description: The teacher name
 *         email:
 *           type: string
 *           description: The teacher email
 *         password:
 *           type: string
 *           description: The teacher password
 *         birthday:
 *           type: date
 *           description: The teacher birthday
 *         status:
 *           type: string
 *           description: The teacher address
 *       example:
 *         name: jay
 *         email: jay@gmail.com
 *         password: jay123#
 *         birthday: 2000-02-17
 *         status: active
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The student managing API
 */

/**
 * @swagger
 * /student:
 *  post:
 *    summary: Add a new student
 *    tags: [Students]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Student"
 *    responses:
 *      '200':
 *        description: Created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Student"
 */
router.post('/', StudentController.create_student);


/**
 * @swagger
 * /student:
 *   get:
 *     summary: Returns the list of all the student
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/', StudentController.get_all_students)


/**
 * @swagger
 *  /student/{studentId}:
 *    get:
 *      summary: Get a student by ID
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: studentId
 *      responses:
 *        '200':
 *          description: A single student.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 *        '404':
 *           description: Student not found.
 */
router.get('/:studentId', StudentController.get_students_byId)


/**
 * @swagger
 * /student/{studentId}:
 *  patch:
 *    summary: Update a student data.
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: studentId
 *        schema:
 *          type: integer
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Student"
 *    responses:
 *      '200':
 *        description: updated student successfully.
 *      '404':
 *        description: Student not found.
 */
router.patch('/:studentId', StudentController.update_students)


/**
 * @swagger
 *  /student/{studentId}:
 *    delete:
 *      summary: Delete a student by ID
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: studentId
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        '200':
 *          description: Delete student successfully.
 *        '404':
 *          description: Student not found.
 */
router.delete('/:studentId', StudentController.delete_student);


module.exports = router;