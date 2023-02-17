const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const sequelize = require('./util/database')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')

const User = require('./models/user')
const Expense = require('./models/expense')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(userRoutes)
app.use(expenseRoutes)

sequelize.sync()
.then((res)=>{
    //console.log(res)
    app.listen(3000)
}).catch(err=>console.log(err))