const express = require('express').Router;
const CourseController = require('../controller/courseController');

const router = express();

router.get('/', CourseController.get_all_course);

router.post('/', CourseController.create_course)

router.get('/:courseId', CourseController.get_course_byId);

router.delete('/:courseId', CourseController.delete_course);

module.exports = router;