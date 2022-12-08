const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    occupation:{
        type:String,
        required:true,
        trim:true
    },
    salary:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:false
    },
    address:{
        tpye:String,
        required:false
    }
},
{
    timestamps: true//fecha create, and edit
});

module.exports = mongoose.model('Employee', employeeSchema);