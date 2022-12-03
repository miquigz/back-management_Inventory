const {routerAuth} = require('./routes/auth.routes')
const properties = require('./config/properties');
const res = require('express/lib/response');
const DB = require('./config/db')
//Init database
DB();
const express = require('express');
const app = express();
const router = express.Router();

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors()); //allow all domains: access to the API
//TODO: Production change

app.get('/', (req, res)=>{
    res.send("Home.")
})

app.use('/auth' ,routerAuth);



app.listen(properties.PORT, ()=>{ console.log(`Server on port:, ${properties.PORT}`)
});