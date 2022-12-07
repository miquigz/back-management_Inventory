const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.set('useCreateIndex', true);

const productSchema = new Schema({
    code:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required:false,
        trim:true
    },
    price:{ //unit price
        tpye:Number,
        required:true
    },
    finalPrice:{
        tpye:Number,
        required:false
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    monthlyStock:{
        type:Number,
        required:true
    },
    iva:{
        type:Number,
        required:false,
    },
    source:{
        type:String,
        required:false
    }
    
},{
    timestamps: true//fecha create, and edit
});

module.exports = mongoose.model('User', userSchema);