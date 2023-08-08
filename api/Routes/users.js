const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');

router.post('/signup', UserController.user_signup );


router.post('/login', UserController.users_login );


router.delete('/:userId', UserController.users_delete_user );

module.exports = router;