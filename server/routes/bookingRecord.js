const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')

const  BookingRecord = require ('../models/BookingRecord')
const Lounge = require("../models/Lounge");

// @route GET api/bookingRecords
// @desc Get bookingRecord
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const bookingRecords = await BookingRecord.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, lounges })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/bookingRecords
//@desc Create bookingRecord
//@access Private
router.post('/', async (req,res) =>{
    const {customer, host, lounge, wed_date, guest_amount}= req.body
    console.log(req.body)

    //Simple validation

    try{
        const  newBookingRecord = new BookingRecord({customer, host, lounge, wed_date, guest_amount})
        await newBookingRecord.save()

        res.json ({success: true, message: 'Successfully,', post: newBookingRecord})
    } catch (error){
        console.log(error)
        res.status(500).json ({success: false, message: 'Internal server error'})
    }
})


// @route PUT api/bookingRecords
// @desc Update bookingRecord
// @access Private


// @route DELETE api/bookingRecords
// @desc Delete bookingRecord
// @access Private


module.exports = router