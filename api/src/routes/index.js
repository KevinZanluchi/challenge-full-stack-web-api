const express = require('express');

const studentsSearchRoutes = require('./studentsSearchRoutes.js');
const studentsEditRoutes = require('./studentsEditRoutes.js');

const routes = express.Router();

routes.use("/students",studentsSearchRoutes);
routes.use("/students/edit",studentsEditRoutes);

module.exports = { routes };