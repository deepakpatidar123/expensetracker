const Expense = require('../models/expense');

const addexpense = (req, res) => {
    try{
    const { expenseamount,category, description } = req.body;
    if(expenseamount == undefined || expenseamount.length === 0){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }

    Expense.create({expenseamount,category,description}).then(expense => {
        return res.status(201).json({expense, success: true });
    }).catch(err => {
        return res.status(500).json({success : false, error: err})
    })
}catch(err){
    res.status(500).json({message: err, success: false})
}
}
const getexpense = (req, res)=> {
    try{
  Expense.findAll().then(expenses => {
    return res.status(200).json({expenses, success: true})
  })
  .catch(err => {
    return res.status(500).json({ error: err, success: false})
  })
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}
const deleteexpense = (req,res)=> {
    try{
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
     return   res.status(400).json({success: false, })
    }
    Expense.destroy({where: { id: expenseid}}).then(() => {
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    })
}catch(err){
    res.status(500).json({message: err, success: false})
}
}
module.exports = {addexpense,getexpense,deleteexpense}
