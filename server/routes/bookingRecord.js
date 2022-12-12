const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  BookingRecord = require ('../models/BookingRecord')
const User = require("../models/User");
const BookingContract = require('../models/BookingContract')


// @route GET api/bookingRecords
// @desc Get bookingRecord
// @access Private
router.get('/', verifyToken, async (req, res) => {

    if (req.user.role !== 'admin') {
        return res.status(406).json ({success: false, message: 'Không có quyền truy cập!'})
    }

    try {
        const bookingRecords = await BookingRecord.find();
        return res.json({ success: true, bookingRecords })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/bookingRecords
//@desc Create bookingRecord
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {host, lounge, menu, services, wed_date, contract, bill, deposite, state}= req.body

    //Simple validation
    if (req.user.role !== 'admin') return res.status(406).json({ success: false, message: 'Không có quyền truy cập'})

    try{
        const  newBookingRecord = new BookingRecord({host, lounge, menu, services, wed_date, contract, bill, deposite, state})
        await newBookingRecord.save()

        return  res.json ({success: true, message: 'Thêm thành công', bookingRecord: newBookingRecord})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route PUT api/bookingRecords
// @desc Update bookingRecord
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { host, lounge, menu, services, wed_date, contract, state, requestConfirm, requestCancel, requestCheckout } = req.body

    // Simple validation
    let record;
    if (req.user.role !== 'admin') return res.status(406).json({ success: false, message: 'Không có quyền truy cập'})
    if (requestConfirm)
    {
        let contractGet
        if (contract._id) {
            contractGet = await BookingContract.findOne({validate_number: contract._id})
        }
        if (contractGet) return res.status(403).json({success: false, message: 'Mã hợp đồng đã tồn tại'})

        const newContract = await BookingContract({
            ...contract, state : 'init'
        })
        await newContract.save()
        record = await BookingRecord.findOneAndUpdate({_id: req.params.id}, {state: 'confirmed', contract: newContract})
        return res.json ({success: true, message: 'Xác nhận thành công', record})
    }
    if (requestCancel){
        record = await BookingRecord.findOne({_id: req.params.id})
        if (record.state === 'init') {
            record = await BookingRecord.findOneAndUpdate({_id: req.params.id}, {state: 'cancel'})
            return res.json({success: true, message: 'Đã hủy đặt tiệc', record})
        } else {
            //@TODO Xử lý hủy tiệc
            return res.json({success: true, message: 'Hủy đặt tiệc', record: req.body})
        }
    }

    try {
        let updatedBookingRecord = {
            host, lounge, menu, services, wed_date
        }

        //@TODO Validate wed_date

        const bookingRecordUpdateCondition = {_id: req.params.id}

        updatedBookingRecord = await BookingRecord.findOneAndUpdate(
            bookingRecordUpdateCondition,
            updatedBookingRecord,
            {new: true}
        )

        if (!updatedBookingRecord)
            return res.status(401).json({
                success: false,
                message: 'Phiếu đặt tiệc không tìm thấy'
            })

        return res.json({
            success: true,
            message: 'Cập nhật thành công',
            bookingRecord: updatedBookingRecord
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Lỗi xử lý server'})
    }
})



// @route DELETE api/bookingRecords
// @desc Delete bookingRecord
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    if (req.user.role !== 'admin') return res.status(406).json({ success: false, message: 'Không có quyền xóa!'})
    try {
        const bookingRecordDeleteCondition = {_id: req.params.id, state: {$eq: 'init'}}
        const deletedBookingRecord= await BookingRecord.findOneAndDelete(bookingRecordDeleteCondition)

        if (!deletedBookingRecord)
            return res.status(401).json({
                success: false,
                message: 'Tiệc không đuọc xóa do đã được xác nhận'
            })

        res.json({ success: true, bookingRecord: deletedBookingRecord})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xứ lý server' })
    }
})

module.exports = router