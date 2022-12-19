const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  User = require('../models/User')
const  Customer = require ('../models/Customer')
const argon2 = require("argon2");
const {Schema} = require("mongoose");
const calculateAge = require("../utils/calcAge")
const validateEmail = require("../utils/emailValidate")
const omit = require("../utils/omitProp")


// @route GET api/customers
// @desc Get customer
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        let customers = await User.find({role: 'customer'});
        return res.json({ success: true, customers })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/customers
//@desc Create customer
//@access Private
router.post('/', verifyToken, async (req, res) =>{
    const {name, address, birthday, identify_number, gender, email ,state, party_ordered} = req.body
    //Simple validation
    if (req.user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    if (!/^\d+$/.test(identify_number)) return res.status(406).json ({success: false, message: 'Mã chứng minh thư chứa kí tự không hợp lệ!'})
    if (identify_number.length > 16 || identify_number.length < 9) return res.status(406).json ({success: false, message: 'Mã chứng minh thư dài từ 9 - 16 kí tự số !'})

    console.log(calculateAge(new Date(birthday)))

    if (calculateAge(new Date(birthday)) < 18) return res.status(406).json ({success: false, message: 'Chưa đủ tuổi để đặt tiệc'})
    if (email && !validateEmail(email)) return res.status(406).json ({success: false, message: 'Email nhập chưa đúng định dạng'})

    try{
        const isExist = await User.findOne({username: identify_number})
        if (isExist) return res.status(406).json({success: false, message: 'Khách hàng đã tồn tại !'})

        const  hashedPassword = await argon2.hash('1234')
        const  newCustomer = new User({gender, email, address: address?.trim(),state: state || 'available', birthday , role: 'customer' ,name: name?.trim(), identify_number , username: identify_number , password: hashedPassword, party_ordered})
        await newCustomer.save()

        return res.json ({success: true, message: 'Thêm thành công,', newCustomer})
    } catch (error){
        console.log(error)
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})


// @route PUT api/customers
// @desc Update customer
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const {name, address, email, birthday, identify_number, gender, state, party_ordered } = req.body

    // Simple validation
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    if (!/^\d+$/.test(identify_number)) return res.status(406).json ({success: false, message: 'Mã chứng minh thư chứa kí tự không hợp lệ!'})
    if (identify_number.length > 16 || identify_number.length < 9) return res.status(406).json ({success: false, message: 'Mã chứng minh thư dài từ 9 - 16 kí tự số !'})

    if (calculateAge(new Date(birthday)) < 18) return res.status(406).json ({success: false, message: 'Chưa đủ tuổi để đặt tiệc'})
    if (email && !validateEmail(email)) return res.status(406).json ({success: false, message: 'Email nhập chưa đúng định dạng'})

    try {
        const isExist = await User.findOne({identify_number: identify_number,_id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Khách hàng đã tồn tại ùi !'})

        let updatedCustomer = {
            address: address?.trim(),
            birthday,
            email,
            identify_number,
            gender,
            name: name?.trim()
        }

        await User.findOneAndUpdate({_id: {$eq: req.params.id}}, updatedCustomer)

        // User not authorised to update customer or customer not found
        if (!updatedCustomer)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy khách hàng'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            post: updatedCustomer
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi kết nối server' })
    }
})

// @route DELETE api/customers
// @desc Delete customer
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try {
        const customerUser = await User.findOneAndDelete({_id: req.params.id})
        // User not authorised or customer not found
        if (!customerUser)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy khách hàng'
            })
        res.json({ success: true, post: customerUser })
    } catch (error) {

        res.status(500).json({ success: false, message: 'Lỗi kết nối server' })
    }
})

module.exports = router