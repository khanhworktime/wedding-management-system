const express = require('express')
const router = express.Router()
const  argon2 = require('argon2')

const  User = require('../models/User')
const  jwt = require('jsonwebtoken')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res)=>{
    const {username, password, role} = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({success: false, message:'Missing username or password'})

    try {
        // Check for existing user
        const user = await User.findOne({username})

        if(user)
            return  res.status(400).json({success:false, message:'Username already taken'})

        // All good
        const  hashedPassword = await argon2.hash(password)
        const  newUser = new User({username, password: hashedPassword, role : role ? role : 'customer'})
        await  newUser.save()

        // Return token
        const  accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET )
        res.json({success:true, message:'User created successfully', accessToken})
    }catch (error){
        console.log(error)
        res.status(500).json({success: false, message:'Internal server error'})
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public

router.post('/login', async(req, res) =>{
    const  {username, password} = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({success: false, message:'Missing username or password'})

    try{
        //Check for existing user
        const  user = await  User.findOne({username})
        if(!user)
            return  res.status(400).json({success: false, message:'Incorrect username or password'})

        //Username found
        const passwordValid = await  argon2.verify(user.password, password)
        if(!passwordValid || user.role !== 'customer')
            return res.status(400).json({success: false, message:'Incorrect username or password'})

        //All good
        // Return token
        const  accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET )
        res.json({success:true, message:'User logged in successfully', accessToken})

    }catch (error){
        console.log(error)
        res.status(500).json({success: false, message:'Internal server error'})
    }


} )

// @route POST api/auth/admin/login
// @desc adminLogin user
// @access Public

router.post('/admin/login', async(req, res) =>{
    const  {username, password} = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({success: false, message:'Missing username or password'})

    try{
        //Check for existing user
        const  user = await User.findOne({username})
        if(!user)
            return  res.status(400).json({success: false, message:'Incorrect username or password'})

        //Username found
        const passwordValid = await  argon2.verify(user.password, password)
        if(!passwordValid || user.role === 'customer')
            return res.status(400).json({success: false, message:'Incorrect username or password'})

        //All good
        // Return token
        const  accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET )
        res.json({success:true, message:'User logged in successfully', accessToken})

    }catch (error){
        res.status(500).json({success: false, message:'Internal server error'})
    }
})

router.post('/checkToken', async (req, res)=>{
    const {username, accessToken} = req.body
    let user = User.findOne({username})
    user = await user.exec()
    if (!user || !user.accessToken) return res.json({success: false, message:'Không có tài khoản!'})
    if (user.accessToken === accessToken) return res.json({success: true, message:'Đã đăng nhập'})
    return res.json({success: false, message:'Chưa đăng nhập'})
})
module.exports = router