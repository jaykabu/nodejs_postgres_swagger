const express = require('express').Router;
const SubjectController = require('../controller/subjectController');


const router = express();

router.post('/', SubjectController.create_subject);

router.get('/', SubjectController.get_all_subject);

router.get('/:subjectId', SubjectController.get_subject_byId);

router.delete('/:subjectId', SubjectController.delete_subject);

module.exports = router;