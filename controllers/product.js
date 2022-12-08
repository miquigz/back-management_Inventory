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
            code: req.body.code, name:req.body.name,
            description:req.body.description, price:req.body.price,
            stock:req.body.stock, category:req.body.category,
            monthlyStock:req.body.monthlyStock, iva:req.body.iva,
            source:req.body.source//origin 
        }
        Product.create(newProduct, (err, Product)=>{
            if (err) return res.send({message:'ProducCreate - Server error.', err});
            res.status(200).send();
        })
    } catch (error) {
        console.log(`Error en postCreateProduct `, error)
    }
}

const putEditProduct = async (req, res)=>{
    try {
        // if ( !(  await Product.exists({code: req.body.code})) )
        //     res.status(409).send({message:"Code does not exist"})
        let product = await Product.findOne({code:req.body.code}).catch(err => res.status(400).send({message: "Error en edicion product:", err}))
        product.code = req.body.code;
        product.description = req.body.description;
        product.price = req.body.price;
        product.name = req.body.name;
        product.iva = req.body.iva;
        product.category = req.body.category;
        product.stock = req.body.stock; 
        product.monthlyStock = req.body.monthlyStock;
        product.source = req.body.source;
        product = await product.save();
        res.status(200).send(product);
    } catch (error) {
        console.log(`Error en putEditProduct `, error)
    }
}

const deleteProduct = async (req, res)=>{
    try {
        const codeDelete = req.body.code;
        Product.findOneAndDelete({code:req.body.code}).catch((err)=> res.status(400).send({message: "Error en delete product:", err}));
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