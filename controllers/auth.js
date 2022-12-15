const User = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = process.env;

const createUser = async (req, res, next)=>{
    try {
        if( await User.exists({email:req.body.email}))
            res.status(409).send({message:'Email already exists'});

        const newUser = {
            name: req.body.name,
            lastname:req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password) //Encrypt password
        }
        User.create(newUser, (err, user)=>{ //Params user is = user saved in database
            if (err) return res.status(500).send('Server error - Create User.' + err );
            
            const expiresIn = "2h"; 
            const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: expiresIn });
            const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            res.status(200).send({dataUser}); //Return user saved in database + token
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
            const expiresIn = 24*60*60; //24hours
            const accessToken = jwt.sign({id: userSearchDB.id}, process.env.SECRET_KEY, { expiresIn: expiresIn } );
            const dataUser = { //response user, return name+email + token
                name: userSearchDB.name,
                email: userSearchDB.email,
                accessToken: accessToken,
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

const getValidToken = async (req, res)=>{
    try {
        const token = req.params.token
        if (!token) {
            res.status(403).send(false);
        }

        const decoded = jwt.verify(token, config.SECRET_KEY);
        console.log(decoded);
        res.send(await User.exists({id: decoded.id}) !== null);
    } catch (error) {
        console.log(`Error en validToken `, error)
        console.log("false");
        res.send(false);
    }
}

module.exports = {
    createUser,
    loginUser,
    getValidToken
}
