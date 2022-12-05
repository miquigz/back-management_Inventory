const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);

const employeeSchema = new Schema({
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
        type:String,
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