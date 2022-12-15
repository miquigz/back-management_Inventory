const express = require('express');
const routerAuth = express.Router();

const { createUser, loginUser, getValidToken } = require('../controllers/auth');

routerAuth.post('/register', createUser);
routerAuth.post('/login', loginUser);

    routerAuth.get('/validToken/:token', getValidToken);

module.exports = {
    routerAuth
}
