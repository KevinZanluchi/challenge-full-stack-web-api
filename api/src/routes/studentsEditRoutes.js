const express = require('express');
const { StudentsEditController } = require('../controllers/StudentsEditController.js');
const validateStudentSchema = require('../middlewares/validateStudentSchema.js');
const createStudentSchema = require('../schema/createStudentSchema.js');
const updateStudentSchema = require('../schema/updateStudentSchema.js');

const studentsEditRoutes = express.Router();
const studentsEditController = new StudentsEditController();


studentsEditRoutes.get("/:studant", (req,res) => studentsEditController.getStudentEdit(req, res))

studentsEditRoutes.patch("/:studant", validateStudentSchema(updateStudentSchema),(req,res) => studentsEditController.editStudent(req, res))

studentsEditRoutes.post("/", validateStudentSchema(createStudentSchema) ,(req,res) => studentsEditController.addStudent(req, res))

studentsEditRoutes.delete("/:studant", (req,res) => studentsEditController.deleteStudent(req, res))

module.exports = studentsEditRoutes;