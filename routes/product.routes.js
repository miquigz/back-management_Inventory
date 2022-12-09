const express = require('express');
const { getProducts, postCreateProduct, putEditProduct, deleteProduct, getSpecificProduct, getCategoriesProduct } = require('../controllers/product');
const verifyToken = require('../middlewares/auth');

const routerProduct = express.Router();

routerProduct.get('/products', verifyToken,  getProducts);
routerProduct.get('/specific/:code', verifyToken, getSpecificProduct);
routerProduct.get('/categories', verifyToken, getCategoriesProduct);

routerProduct.post('/create', verifyToken, postCreateProduct);
routerProduct.put('/edit', verifyToken , putEditProduct)
routerProduct.delete('/delete/:code', verifyToken, deleteProduct)

module.exports = { routerProduct };