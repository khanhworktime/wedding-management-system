const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  BookingDeposite = require ('../models/BookingDeposite')
const User = require("../models/User");



// @route GET api/bookingDeposites
// @desc Get bookingDeposite
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const bookingDeposites = await BookingDeposite.find();
        return res.json({ success: true, bookingDeposites })
    } catch (error) {

        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/bookingDeposites
//@desc Create bookingDeposite
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {amount,contract_state}= req.body

    //Simple validation

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try{
        const  newBookingDeposite = new BookingDeposite({amount, contract_state: contract_state || 'unavailable' })
        await newBookingDeposite.save()

        return  res.json ({success: true, message: 'Thêm mới thành công', bookingDeposite: newBookingDeposite})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})



// @route PUT api/bookingDeposites
// @desc Update bookingDeposite
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { amount,contract_state } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try {
        let updatedBookingDeposite = {
            contract_state: contract_state || 'unavailable',
            amount
        }

        const bookingDepositeUpdateCondition = {_id: req.params.id}

        updatedBookingDeposite = await BookingDeposite.findOneAndUpdate(
            bookingDepositeUpdateCondition,
            updatedBookingDeposite,
            {new: true}
        )

        if (!updatedBookingDeposite)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy phiếu đặt cọc'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            bookingDeposite: updatedBookingDeposite
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Lỗi xử lý server'})
    }
})



// @route DELETE api/bookingDeposites
// @desc Delete bookingDeposite
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    try {
        const bookingDepositeDeleteCondition = {_id: req.params.id}
        const deletedBookingDeposite= await BookingDeposite.findOneAndDelete(bookingDepositeDeleteCondition)


        if (!deletedBookingDeposite)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy phiếu đặt cọc'
            })

        res.json({ success: true, bookingDeposite: deletedBookingDeposite})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})
module.exports = router