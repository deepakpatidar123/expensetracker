// const User = require('../models/user');
// const e = require('express');
// // const sequelize = require('../util/database');

// exports.getUserLeaderBoard = async(req, res) => {
//     try{
//         const leaderboardofusers = await User.findAll({
//            order:[['totalExpenses', 'DESC']]

//         })

//         res.status(200).json(leaderboardofusers)

//     } catch (err){
//         console.log(err)
//         res.status(500).json(err)
//     }
// }

const User = require('../models/user');
const e = require('express')

exports.getUserLeaderBoard = async (req, res)=>{
    try{
         const leaderboardofUsers = await User.findAll({
            order:[['totalExpenses','DESC']]
        });

         res.status(200).json(leaderboardofUsers);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}   