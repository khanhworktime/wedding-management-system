const express = require('express')
const router = express.Router()
const  argon2 = require('argon2')

const  User = require('../models/User')
const  jwt = require('jsonwebtoken')
const verifyToken = require("../middleware/auth");
const omitProps = require('../utils/omitProp')
router.get('/', verifyToken, async(req, res) =>{

    try{
        const user = await User.findOne({_id: req.userId})
        return res.json({success:true, user: omitProps(user["_doc"], 'password')})

    }catch (error){
        console.log(error)
        res.status(500).json({success: false, message:'Lỗi xử lý server'})
    }
})

router.get('/all', verifyToken, async(req, res) =>{
    const reqUser = await User.findOne({_id: req.userId})
    if(reqUser.role !== "admin")
        return res.status(406).json({success: false, message:'Không có quyền truy cập!'})

    try{
        const users = await User.find()
        return res.json({success:true, users: users})
    }catch (error){
        console.log(error)
        res.status(500).json({success: false, message:'Lỗi xử lý server'})
    }
})

router.get('/:id', verifyToken, async(req, res) =>{
    const  uid = req.params.id

    try{
        //Check for existing user
        const user = await  User.findOne({_id: uid})
        const reqUser = await User.findOne({_id: req.userId})
        if (reqUser.role !== 'admin'){
            return  res.status(406).json({success: false, message:'Không có quyền tìm User!'})
        }

        if(!user)
            return  res.status(400).json({success: false, message:'Không tìm được người dùng!'})
        //All good
        return res.json({success:true, user})

    }catch (error){
        console.log(error)
        return res.status(500).json({success: false, message:'Lỗi xử lý server'})
    }
} )

module.exports = router