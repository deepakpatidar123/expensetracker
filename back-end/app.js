const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const sequelize = require('./util/database')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeature')
const resetPasswordRoutes = require('./routes/resetpassword')

const User = require('./models/user')
const Expense = require('./models/expense')
const Order = require('./models/orders')
const Forgotpassword = require('./models/forgotpassword');

const app = express()

 
app.use(cors())
// app.use(bodyParser.json())
app.use(express.json());

app.use(userRoutes)
app.use(expenseRoutes)
app.use(purchaseRoutes)
app.use(premiumFeatureRoutes)
app.use( resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()

.then((res)=>{
    //console.log(res)
    app.listen(3000)
}).catch(err=>console.log(err))