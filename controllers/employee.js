const Employee = require('../models/employee');

const getEmployees = async (req, res)=>{
    try {
        const employees = await Employee.find()
        .catch((err) => res.status(400).send({message:"Error in getEmployees:", err}))
        res.status(200).send(employees);
    } catch (error) {
        console.log(`Error en getEmployees `, error)
    }
}

const getSpecificEmployee = async (req, res)=>{
    try {
        const specificEmployee = await Employee.findOne({email:req.params.email})
        .catch((err)=> res.status(400).send({message: "Error in get specific employee:", err}))
        res.status(200).send(specificEmployee);
    } catch (error) {
        console.log(`Error en getSpecificEmployee `, error)
    }
}

const getCategories = async (req, res)=>{
    try {
        const categories = await Employee.distinct("occupation");
        res.status(200).send(categories);
    } catch (error) {
        console.log(`Error en getAllCategories `, error)
    }
}

const postCreateEmployee = async (req, res)=>{
    try {
        const newEmployee = {
            name:req.body.name, lastname:req.body.lastname, age:req.body.age, email:req.body.email,
            occupation:req.body.occupation, address:req.body.adress, phone:req.body.phone, salary:req.body.salary
        }
        createdEmployee = await Employee.create(newEmployee)
        .catch((err)=>{
            if(err && err.code === 11000) return res.status(409).send({message:'Email already exists'});
            if (err) return res.status(500).send('Server error.');
        })
        res.status(200).send(createdEmployee);
    } catch (error) {
        console.log(`Error en postCreateEmployee `, error);
    }
}

const putEditEmployee = async (req, res)=>{
    try {
        const editEmployee = {
            name:req.body.name, lastname:req.body.lastname, age:req.body.age, email:req.body.email,
            occupation:req.body.occupation, address:req.body.adress, phone:req.body.phone
        }
        await Employee.findOneAndUpdate({email:req.params.email}, editEmployee)
        .then(()=> res.status(200).send({message:`Employee update:${editEmployee.name}`}))
        .catch((err)=> res.status(400).send({message: "Error in edit employee:", err}))
    } catch (error) {
        console.log(`Error en putEditEmployee `, error)
    }
}

const deleteEmployee = async (req, res)=>{
    try {
        const idDelete = req.params.email;
        await Employee.findOneAndDelete({email:idDelete})
        .then(()=> res.status(200).send({message:`Employee deleted:${idDelete}`}))
        .catch((err)=> res.status(400).send({message: "Error in delete employee:", err}))
    } catch (error) {
        console.log(`Error en deleteEmployee `, error)
    }
}

module.exports = {
    getEmployees,
    getSpecificEmployee,
    getCategories,
    postCreateEmployee,
    putEditEmployee,
    deleteEmployee
}