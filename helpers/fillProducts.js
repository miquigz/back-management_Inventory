const express = require('express')
const { faker } = require('@faker-js/faker')

const generateProduct = () => {
    const price = faker.commerce.price(15, 350);
    const product = {
        code:faker.commerce.product(),
        name:faker.commerce.product(),
        description:faker.commerce.productAdjective(),
        price:price,
        acquisitionPrice: price - faker.random.numeric(1),
        stock:faker.random.numeric(2),
        category:faker.commerce.department(),
        monthlyStock:faker.random.numeric(3),
        iva:faker.random.numeric(2) * 0.01,
        source:faker.company.name()
    }
    
    return product
}

module.exports = {
    generateProduct
}
