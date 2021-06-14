const express = require('express').Router;
const router = express();

const TeacherController = require('../controller/teacherController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
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
 *   name: Teachers
 *   description: The teacher managing API
 */


/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.get('/', TeacherController.get_all_teacher);


/**
 * @swagger
 * /teacher:
 *  post:
 *    summary: Add a new teacher
 *    tags: [Teachers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Teacher"
 *    responses:
 *      '200':
 *        description: Created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Teacher"
 */
router.post('/', TeacherController.create_teacher);


/**
 * @swagger
 *  /teacher/{teacherId}:
 *    get:
 *      summary: Get a teacher by ID
 *      tags: [Teachers]
 *      parameters:
 *        - in: path
 *          name: teacherId
 *      responses:
 *        '200':
 *          description: A single teacher.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Teacher'
 *        '404':
 *           description: Teacher not found.
 */
router.get('/:teacherId', TeacherController.get_teacher_byId);


/**
 * @swagger
 * /teacher/{teacherId}:
 *  patch:
 *    summary: Update a teacher data.
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: teacherId
 *        schema:
 *          type: integer
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Teacher"
 *    responses:
 *      '200':
 *        description: updated teacher successfully.
 *      '404':
 *        description: Teacher not found.
 */
router.patch('/:teacherId', TeacherController.update_teacher);


/**
 * @swagger
 *  /teacher/{teacherId}:
 *    delete:
 *      summary: Delete a teacher by ID
 *      tags: [Teachers]
 *      parameters:
 *        - in: path
 *          name: teacherId
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        '200':
 *          description: Delete teacher successfully.
 *        '404':
 *          description: Teacher not found.
 */
router.delete('/:teacherId', TeacherController.delete_teacher);

module.exports = router;