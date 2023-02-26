const express = require('express')
const expenseController = require('../controller/expense')
const userauthentication = require('../middleware/auth')

const router = express.Router()

router.post('/expense/addexpense',userauthentication.authenticate, expenseController.addexpense)

router.get('/expense/getexpenses',userauthentication.authenticate, expenseController.getexpense)

router.delete('/expense/deleteexpense/:expenseid',userauthentication.authenticate, expenseController.deleteexpense)



module.exports = router;