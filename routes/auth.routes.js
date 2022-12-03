const express = require('express');
const routerAuth = express.Router();

const { createUser, loginUser } = require('../controllers/auth');

routerAuth.post('/register', createUser);
routerAuth.post('/login', loginUser);

module.exports = {
    routerAuth
}
