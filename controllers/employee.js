const Employee = require('../models/employee');

const getEmployees = async (req, res)=>{
    try {
        const allEmployees = await Employee.find();
        res.send = [allEmployees];
    } catch (error) {
        console.log(`Error en getEmployees `, error)
    }
}

const postCreateEmployee = async (req, res)=>{
    try {
        const newEmployee = {
            name:req.body.name,
            lastname:req.body.lastname,
            age:req.body.age,
            email:req.body.email,
            occupation:req.body.occupation,
            address:req.body.adress,
            phone:req.body.phone
        }
        Employee.create(newEmployee, (err, user)=>{
            if(err && err.code === 11000) return res.status(409).send({message:'Email already exists'});
            if (err) return res.status(500).send('Server error.');
            res.status(200).send(user);
        });
    } catch (error) {
        console.log(`Error en postCreateEmployee `, error)
    }
}

const putEditEmployee = async (req, res)=>{
    try {
        
    } catch (error) {
        console.log(`Error en putEditEmployee `, error)
    }
}



module.exports = {
    getEmployees,
    postCreateEmployee,
    putEditEmployee
}