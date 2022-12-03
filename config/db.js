const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = async ()=>{
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Connected mongo on:', dbURL)

    } catch (error) {

        console.log("Error in the connection database", error);

    }
}  