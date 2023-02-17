const express = require('express')
const expenseController = require('../controller/expense')

const router = express.Router()

router.post('/expense/addexpense', expenseController.addexpense)

router.get('/expense/getexpenses', expenseController.getexpense)

router.delete('/expense/deleteexpense/:expenseid', expenseController.deleteexpense)



module.exports = router;