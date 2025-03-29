const express = require('express');
const { StudentsSearchController } = require('../controllers/StudentsSearchController.js');

const studentsSearchRoutes = express.Router()
const studentsSearchController = new StudentsSearchController();


studentsSearchRoutes.get("/", (req, res) => studentsSearchController.getStudents(req, res))


module.exports =  studentsSearchRoutes;
