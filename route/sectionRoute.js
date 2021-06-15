const express = require('express').Router;
const SectionController = require('../controller/sectionController');

const router = express();


router.post('/', SectionController.create_section)


router.get('/', SectionController.get_all_section);

module.exports = router;