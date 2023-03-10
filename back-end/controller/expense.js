const Expense = require('../models/expense');
const User = require('../models/user')
const sequelize = require('../util/database');

const addexpense = async(req, res) => {
//     const t = await sequelize.transaction();
//     try{
//     const { expenseamount,category, description } = req.body;


//     if(expenseamount == undefined || expenseamount.length === 0){
//         return res.status(400).json({success: false, message: 'Parameters missing'})
//     }

//    const expense = await Expense.create({expenseamount,category,description,userId: req.user.id}, {transaction: t}).then(expense => {
//     const totalExpense = Number(re.user.totalExpenses) + Number(expenseamount)
    
//    await User.update({
//         totalExpenses: totalExpense
//     },{
//         where: {id: req.user.id},
//         transaction: t
//     })
//        await t.commit();
//        res.status(200).json({expense: expense})
//    })

// }catch(err) {
//   await t.rollback();
//     return res.status(500).json({success : false, error: err})
// }
const t = await seqeilize.transaction();
   try{
    const {expenseamount, description, category} = req.body;

    if(expenseamount== undefined || expenseamount.length==0){
        return res.status(400).json({seccess: false, message:'parameter is missing'})
    }
    const expense = await Expense.create({expenseamount, description, category,userId: req.user.id }, {transaction: t })
    const totalExpense = Number(req.user.totalExpenses)+ Number(expenseamount) 
    await User.update({
         totalExpenses: totalExpense
      },{
            where : {id:req.user.id},
            transaction: t
        })
         await t.commit();
         res.status(200).json({expense:expense})
        
    } catch(err){
        await t.rollback();
        return res.status(500).json({success:false, error:err})
     }
}
const getexpense = (req, res)=> {
    
 Expense.findAll({where :{userId: req.user.id}}).then(expense => {
    return res.status(200).json({expense, success: true})
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({ error: err, success: false})
  })
    
}
const deleteexpense = (req,res)=> {
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

}

        module.exports = {addexpense,getexpense,deleteexpense}
