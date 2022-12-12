const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  BookingContract = require ('../models/BookingContract')
const User = require("../models/User");



// @route GET api/bookingContracts
// @desc Get bookingContract
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const bookingContracts = await BookingContract.find();
        return res.json({ success: true, bookingContracts })
    } catch (error) {

        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/bookingContracts
//@desc Create bookingContract
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {validate_number,contract_state}= req.body

    //Simple validation

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try{
        const  newBookingContract = new BookingContract({validate_number, contract_state: contract_state || 'unavailable' })
        await newBookingContract.save()

        return  res.json ({success: true, message: 'Thêm mới thành công,', bookingContract: newBookingContract})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route PUT api/bookingContracts
// @desc Update bookingContract
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { validate_number,contract_state } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try {
        let updatedBookingContract = {
            contract_state: contract_state || 'unavailable',
            validate_number
        }

        const bookingContractUpdateCondition = {_id: req.params.id}

        updatedBookingContract = await BookingContract.findOneAndUpdate(
            bookingContractUpdateCondition,
            updatedBookingContract,
            {new: true}
        )

        if (!updatedBookingContract)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy hợp đồng'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            bookingContract: updatedBookingContract
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Lỗi xử lý server'})
    }
})



// @route DELETE api/bookingContracts
// @desc Delete bookingContract
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    try {
        const bookingContractDeleteCondition = {_id: req.params.id}
        const deletedBookingContract= await BookingContract.findOneAndDelete(bookingContractDeleteCondition)


        if (!deletedBookingContract)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy hợp đồng'
            })

        res.json({ success: true, bookingContract: deletedBookingContract})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

module.exports = router