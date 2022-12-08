const Product = require('../models/product');

const getProducts = async (req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.log(`Error en getProducts `, error)
    }
}

const getSpecificProduct = async (req, res)=>{
    try {
        console.log(req.params);
        if ( !(await Product.exists({code:req.params.code})) )
            res.status(400).send({message: `Product with code:${req.params.code} does not exist`})
        
        await Product.findOne({code:req.params.code})
        .then((product)=> res.status(200).send(product))
        .catch((err)=>{ console.log(err); return res.status(400).send({message:`error:${err}`}) });
    } catch (error) {
        console.log(`Error en getSpecificProduct `, error)
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
            res.status(200).send(Product);
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
        new URLSearchParams(req.params.code).toString();
        const codeDelete = req.params.code;
        if ( !(await Product.exists({code:codeDelete})) )
            res.status(409).send({message: "Code does not exists"})
        await Product.findOneAndDelete({code:codeDelete}).catch((err)=> res.status(400).send({message: "Error en delete product:", err}));
        res.status(200).send({message: "Ok, deleted product"});
    } catch (error) {
        console.log(`Error en deleteProduct `, error);
    }
}

module.exports = {
    getProducts,
    postCreateProduct,
    putEditProduct,
    deleteProduct,
    getSpecificProduct
}