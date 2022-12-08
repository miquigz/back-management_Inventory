const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
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
    password:{
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true//fecha create, and edit
});

module.exports = mongoose.model('User', userSchema);