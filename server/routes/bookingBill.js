const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  User = require('../models/User')
const  BookingBill = require ('../models/BookingBill')
const Lounge = require("../models/Lounge");

// @route GET api/bookingBills
// @desc Get bookingBill
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const bookingbills = await BookingBill.find();
        return res.json({ success: true, bookingbills })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/bookingBills
//@desc Create bookingBill
//@access Private
router.post('/', verifyToken, async (req, res) =>{
    const {pay_date,price_per_table,booking_price,total_dish,total_service,total,deposite_id,bill_state,discount_for_lounge,booking_service_fee} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})

    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try{


        const  newBookingBill = new BookingBill({pay_date, price_per_table,booking_price,total_dish, total_service, total,deposite_id,booking_price,bill_state,discount_for_lounge,booking_service_fee})
        await newBookingBill.save()

        return res.json ({success: true, message: 'Successfully,', BookingBill: newBookingBill})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Internal server error'})
    }
})

// @route PUT api/bookingBills
// @desc Update bookingBill
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { pay_date,price_per_table,booking_price,total_dish,total_service,total,deposite_id,bill_state,discount_for_lounge,booking_service_fee } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try {


        let updatedBookingBill = {
            pay_date,price_per_table,booking_price,total_dish,total_service,total,deposite_id,bill_state: bill_state || 'unpaid',discount_for_lounge,booking_service_fee
        }

        const boookingBillUpdateCondition = {_id: req.params.id}

        updatedBookingBill = await Lounge.findOneAndUpdate(
            boookingBillUpdateCondition,
            updatedBookingBill,
            { new: true }
        )

        // User not authorised to update lounge or lounge not found
        if (!updatedBookingBill)
            return res.status(401).json({
                success: false,
                message: 'BookingBill not found'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedBookingBill
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/bookingBills
// @desc Delete bookingBill
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try {
        const bookingBillDeleteCondition = { _id: req.params.id }
        const deletedBookingBill = await Lounge.findOneAndDelete(bookingBillDeleteCondition)

        // User not authorised or lounge not found
        if (!deletedBookingBill)
            return res.status(401).json({
                success: false,
                message: 'BookingBill not found'
            })

        res.json({ success: true, bookingBill: deletedBookingBill })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router