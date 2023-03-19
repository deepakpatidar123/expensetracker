// const express = require('express')
// const expenseController = require('../controller/expense')
// const userauthentication = require('../middleware/auth')

// const router = express.Router()

// router.post('/expense/addexpense', expenseController.addexpense)

// router.get('/expense/getexpenses', expenseController.getexpense)

// router.delete('/expense/deleteexpense/:expenseid', expenseController.deleteexpense)



// module.exports = router;

const express = require('express');

const expenseController = require('../controllers/expense');
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post('/expense/addexpense', userauthentication.authenticate, expenseController.addExpense);

router.get('/expense/getexpenses', userauthentication.authenticate, expenseController.getExpenses);

router.delete('/expense/deleteexpense/:expenseid', userauthentication.authenticate, expenseController.deleteExpense);

// router.post('/user/login',userController.postLogin);

module.exports = router;