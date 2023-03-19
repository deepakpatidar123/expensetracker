// const Expense = require('../models/expense');
// const User = require('../models/user')
// const sequelize = require('../util/database');
// const jwt = require('jsonwebtoken')

// const addexpense = async(req, res) => {
   

// //    try{
//     const {expenseamount, description, category,token} = req.body;
   
//     const decodeToken = jwt.verify(token,"secret")
//     console.log(decodeToken,"decode token")
//     console.log(decodeToken)
//     if(expenseamount== undefined || expenseamount.length==0){
//         return res.status(400).json({seccess: false, message:'parameter is missing'})
//     }
//     const expense = await Expense.create({expenseamount, description, category,userId: decodeToken })
//     // const totalExpense = Number(req.user.totalExpenses)+ Number(expenseamount) 
//     // await User.update({
//     //      totalExpenses: totalExpense
//     //   },{
//     //         where : {id:req.user.id},
            
//     //     })
         
//          res.status(200).json({expense:expense})
        
//     // } catch(err){
//     //     await t.rollback();
//     //     return res.status(500).json({success:false, error:err})
//     //  }
// }
// const getexpense =async (req, res)=> {
//    const {token }=req.body
//    console.log(token)
// //    const decodeToken = "xyz"
//    const decodeToken = jwt.verify(token,"secret")
//   await Expense.findAll({where :{userId: decodeToken}}).then(expense => {
//     return res.status(200).json({expense, success: true})
//   })
//   .catch(err => {
//     console.log(err)
//     return res.status(500).json({ error: err, success: false})
//   })
    
// }
// const deleteexpense = (req,res)=> {
//     const expenseid = req.params.expenseid;
//     console.log(expenseid)
//     if(expenseid == undefined || expenseid.length === 0){
//      return   res.status(400).json({success: false, })
//     }
//     Expense.destroy({where: { id: expenseid}}).then((noofrows) => {
//         if(noofrows === 0){
//             return res.status(404).json({success: false, message: 'Expense doesnt belong to the user'})
//         }
//         return res.status(200).json({ success: true, message: "Deleted Successfuly"})
//     }).catch(err => {
//         console.log(err);
//         return res.status(500).json({ success: true, message: "Failed"})
//     })

// }

//         module.exports = {addexpense,getexpense,deleteexpense}


const Expense = require('../models/expense');
const User = require('../models/user');
const seqeilize = require('../util/database');
const DownloadedFile = require('../models/downlededFile');


const UserServices = require('../services/userservices');
const S3Services = require('../services/S3services');
const { query } = require('express');

exports.downloadExpense = async (req, res) =>{
    try{
   const expense = await UserServices.getExpenses(req);
   console.log(expense);
   const stringifiedExpenses = JSON.stringify(expense);

   const userId = req.user.id;
   const filename = `Expense${userId}/${new Date()}.txt`;
   const fileURL = await S3Services.uploadToS3(stringifiedExpenses, filename);
     
   DownloadedFile.create({
     url:fileURL,
     userId:req.user.id
  })
   res.status(200).json({fileURL, success:true});
 }catch(err){
    console.log(err);
    res.status(500).json({filename:'', success:false,err})
 }
}

 exports.addExpense = async (req, res) =>{
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
exports.getExpenses = async (req, res) => {
    try {
        const totalCount=await UserServices.countExpenses(req.user);
        const { page, rows } = req.query;
        offset = (page-1)*rows
        limit = rows * 1;
        const expenses = await req.user.getExpenses(req.user, { offset, limit });
        res.status(200).json({expenses,totalCount});
    }
    catch (error) {
        res.status(504).json({ message: 'Something went wrong!', error: error });
        console.log(error);
    }
}

exports.deleteExpense = async (req, res)=>{
    const expenseid = req.params.expenseid;
    try{
      await Expense.destroy({where: {id: expenseid, userId : req.user.id}});
      res.sendStatus(200);
    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
 }

// exports.deleteExpense = async (req, res)=>{
//     const t= await seqeilize.transaction();
//     const {expenseamount, description, category} = req.body;
//     const expenseid = req.params.expenseid;
//     try{
//       await Expense.destroy({where: {id: expenseid, userId : req.user.id},transaction:t});

//       const totalExpense=Number(req.user.totalExpenses)-Number(req.user.expenseamount);
//       await req.user.update({totalExpenses:totalExpense},{transaction:t});
//       await t.commit();
//       res.sendStatus(200);
//     } catch(err){
//         console.log(err);
//         await t.rollback();
//         res.status(500).json(err)
//     }
//  } 