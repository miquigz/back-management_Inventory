const User = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY  = 'secret123';//TODO: Pasar a .env

const createUser = async (req, res, next)=>{
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password) //Encrypt password
        }
        User.create(newUser, (err, user)=>{ //Params user is = user saved in database
            if(err && err.code === 11000) return res.status(409).send({message:'Email already exists'});
            if (err) return res.status(500).send('Server error.');

            const expiresIn = 24*60*60; 
            const accesToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn:expiresIn });
            const dataUser = {
                name: user.name,
                email: user.email,
                accesToken: accesToken,
                expiresIn: expiresIn
            }
            res.send({dataUser}); //Return user saved in database + token
        })
    } catch (error) {
        console.log(`Error en createUser `, error)
    }
}

const loginUser = async (req, res)=>{
    try {
        const userRequest = {
            email:req.body.email,
            password :req.body.password
        }
        const userSearchDB = await User.findOne( {email:userRequest.email} ); //search database
        //Si exists user with request email and password matchs with database account:
        if (userSearchDB && bcrypt.compareSync(userRequest.password, userSearchDB.password) ){            
            const expiresIn = 24*60*60;
            const accesToken = jwt.sign({id: userSearchDB.id}, SECRET_KEY, { expiresIn: expiresIn } );

            const dataUser = { //response user, return name+email + token
                name: userSearchDB.name,
                email: userSearchDB.email,
                accesToken: accesToken,
                expiresIn: expiresIn
            }
            res.send({dataUser});
        }else{
            res.status(409).send({message: 'Something is wrong'});
        }
    } catch (error) {
        console.log(`Error en loginUser `, error);
        res.status(500).send("Error en loginUser");
    }
}

module.exports = {
    createUser,
    loginUser
}
