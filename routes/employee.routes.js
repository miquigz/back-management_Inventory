const express = require('express');
const routerEmployee = express.Router();

const { getEmployees, postCreateEmployee, putEditEmployee, deleteEmployee, getSpecificEmployee, getCategories } = require('../controllers/employee');
const verifyToken = require('../middlewares/auth');

// const { getEmployees ,createEmployee, editEmployee, deleteEmployee}

routerEmployee.get('/employees', verifyToken ,getEmployees);

routerEmployee.get('/specific/:email', verifyToken ,getSpecificEmployee);

routerEmployee.get('/categories', verifyToken, getCategories);

routerEmployee.post('/create', verifyToken , postCreateEmployee);

routerEmployee.put('/edit/:email', verifyToken, putEditEmployee)

routerEmployee.delete('/delete/:email', verifyToken, deleteEmployee);


module.exports = {
    routerEmployee
};
