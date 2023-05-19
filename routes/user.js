const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js')


router.get('/users', userController.getAllUsers);
router.get('/students', userController.getAllStudents);

router.post('/users', userController.createUser);
router.post('/login', userController.login);
router.put('/user/:id', userController.updateUserverfication);

router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.put('/users/student/:id', userController.updateStudent);
router.put('/users/teacher/:id', userController.updateTeacher);
router.put('/users/parent/:id', userController.updateParent);

router.delete('/users/:id', userController.deleteUser);
router.get('/userscount',userController.getUsersNumbers);
router.get('/students/:id', userController.getStudentById);


module.exports = router;
