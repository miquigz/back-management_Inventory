const express = require('express');
const routerEmployee = express.Router();

const { getEmployees, postCreateEmployee, putEditEmployee, deleteEmployee, getSpecificEmployee, getAllCategories } = require('../controllers/employee');
const verifyToken = require('../middlewares/auth');

// const { getEmployees ,createEmployee, editEmployee, deleteEmployee}

routerEmployee.get('/employees', verifyToken ,getEmployees);

routerEmployee.get('/specific/:email', verifyToken ,getSpecificEmployee);

routerEmployee.get('/categories', verifyToken, getAllCategories);

routerEmployee.post('/create', verifyToken , postCreateEmployee);

routerEmployee.put('/edit/:email', verifyToken, putEditEmployee)

routerEmployee.delete('/delete/:email', verifyToken, deleteEmployee);




module.exports = {
    routerEmployee
};
