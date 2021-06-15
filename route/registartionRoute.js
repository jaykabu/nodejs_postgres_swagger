const express = require('express').Router;
const RegistrationController = require('../controller/registrationController');

const router = express();

router.post('/', RegistrationController.create_registration);

router.get('/', RegistrationController.get_all_registration);

router.get('/:id', RegistrationController.get_register_byId)


module.exports = router;