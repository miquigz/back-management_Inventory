const Product = require('../models/product');

const getProducts = async (req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.log(`Error en getProducts `, error)
    }
}


const postCreateProduct = async (req, res)=>{
    try {
        if(await Product.exists({code: req.body.code}))
            res.status(409).send({message: 'Code Already exists'});

        const newProduct = {
            code: req.body.code,
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            finalPrice: req.body.price * (req.body.iva + 1),
            stock:req.body.stock,
            category:req.body.category,
            monthlyStock:req.body.monthlyStock,
            iva:req.body.iva,
            source:req.body.source//origin 
        }
        Product.create(newProduct, (err, Product)=>{
            if (err) return res.status(500).send('ProducCreate - Server error.', err);
            res.status(200).send();
        })

    } catch (error) {
        console.log(`Error en postCreateProduct `, error)
    }
}

const putEditProduct = async (req, res)=>{
    try {
        if( (await Product.find({code: req.body.code})).length >= 2 )//TODO:Check
            res.status(409).send({message: 'Code Already exists'});
        const editProduct = {
            code: req.body.code,
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            finalPrice: req.body.price * (req.body.iva + 1),
            stock:req.body.stock,
            category:req.body.category,
            monthlyStock:req.body.monthlyStock,
            iva:req.body.iva,
            source:req.body.source//origin 
        }

        Product.updateOne({code: req.body.code}, editProduct);

    } catch (error) {
        console.log(`Error en putEditProduct `, error)
    }
}

const deleteProduct = async (req, res)=>{
    try {
        const codeDelete = req.body.code;
        Product.findOneAndDelete({code:req.body.code});
    } catch (error) {
        console.log(`Error en deleteProduct `, error);
    }
}

module.exports = {
    getProducts,
    postCreateProduct,
    putEditProduct,
    deleteProduct
}