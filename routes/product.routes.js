const express = require('express');
const { getProducts, postCreateProduct, putEditProduct, deleteProduct } = require('../controllers/product');
const verifyToken = require('../middlewares/auth');

const routerProduct = express.Router();


routerProduct.get('/products', verifyToken,  getProducts);
routerProduct.post('/create', verifyToken, postCreateProduct);
routerProduct.put('/edit', verifyToken , putEditProduct)
routerProduct.delete('/delete/:code', verifyToken, deleteProduct)

module.exports = { routerProduct };