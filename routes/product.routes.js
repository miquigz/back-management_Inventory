const express = require('express');
const { getProducts, postCreateProduct } = require('../controllers/product');
const routerProduct = express.Router();


routerProduct.get('/products', getProducts);
routerProduct.post('/create', postCreateProduct);



module.exports = { routerProduct };