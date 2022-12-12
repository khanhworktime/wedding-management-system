const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  BookingRecord = require ('../models/BookingRecord')

// @route GET api/bookingRecords
// @desc Get bookingRecord
// @access Private
router.get('/', verifyToken, async (req, res) => {

    if (req.user.role !== 'admin') {
        return res.status(406).json ({success: false, message: 'Không có quyền truy cập!'})
    }

    try {
        const bookingRecords = await BookingRecord.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, bookingRecords })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/bookingRecords
//@desc Create bookingRecord
//@access Private



// @route PUT api/bookingRecords
// @desc Update bookingRecord
// @access Private


// @route DELETE api/bookingRecords
// @desc Delete bookingRecord
// @access Private


module.exports = router