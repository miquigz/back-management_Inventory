const express = require('express');
const routerEmployee = express.Router();

const { getEmployees, postCreateEmployee, putEditEmployee } = require('../controllers/employee');

// const { getEmployees ,createEmployee, editEmployee, deleteEmployee}

routerEmployee.get('/getAll', getEmployees);

routerEmployee.post('/create', postCreateEmployee);

//TODO:MethodOverride
// routerEmployee.put('/edit/:id', putEditEmployee)

// routerEmployee.delete('/');


module.exports = {
    routerEmployee
};
