const Expense = require('../models/expense');

const addexpense = (req, res) => {
   
    const { expenseamount,category, description } = req.body;
    if(expenseamount == undefined || expenseamount.length === 0){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }

    Expense.create({expenseamount,category,description,userId}).then(expense => {
        return res.status(201).json({expense, success: true });
    }).catch(err => {
        return res.status(500).json({success : false, error: err})
    })
}

const getexpense = (req, res)=> {
    
 Expense.findAll().then(expenses => {
    return res.status(200).json({expenses, success: true})
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({ error: err, success: false})
  })
    
}
const deleteexpense = (req,res)=> {
    try{
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
     return   res.status(400).json({success: false, })
    }
    Expense.destroy({where: { id: expenseid, userId: req.user.id}}).then((noofrows) => {
        if(noofrows === 0){
            return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
        }
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
