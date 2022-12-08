const apiv1 = '/api/v1';
const res = require('express/lib/response');
const DB = require('./config/db')
const cors = require('cors');
require('dotenv').config()
//Init database
DB();

const express = require('express');
const { routerEmployee } = require('./routes/employee.routes');
const { routerProduct } = require('./routes/product.routes');
const { routerAuth } = require('./routes/auth.routes')
const app = express();
const router = express.Router();

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors()); //allow all domains: access to the API
//TODO: Production change


// app.get('/', (req, res)=>{
//     res.send("Home.")
// })

app.use(`${apiv1}/auth` ,routerAuth);
app.use(`${apiv1}/employees`, routerEmployee);
app.use(`${apiv1}/product`, routerProduct)


const PORT = process.env.PORT;
app.listen(PORT, (err)=>{ 
    if(err) throw new Error('Ocurrió un problema con el servidor: ', err);
    console.log(`Server on port:, ${PORT}`)
});