const Router = require('express').Router;
const userController = require('./user-controller'); 
const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/resetPassword', userController.resetPassword);
router.post('/new-password', userController.setNewPassword);
router.get('/refresh', userController.refresh);

module.exports = router;