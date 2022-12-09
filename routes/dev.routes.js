const express = require('express')
const { generateProduct } = require('../helpers/fillProducts')
const routerDev = express.Router()

const Product = require('../models/product');

routerDev.get('/db/fresh', async (req, res = express.response) => {
    try {
        const product = await Product.deleteMany();
        for (let i = 0; i < 15; i++) {
            const newProduct = generateProduct()
            const prod = new Product(newProduct)
            await prod.save()
        }       
        res.status(200).send('OK')
    } catch (error) {
        console.log(error)
        res.send('Todo ERROR')
    }   
})

module.exports = {
    routerDev
}