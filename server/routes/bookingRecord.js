const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const BookingRecord = require ('../models/BookingRecord')
const User = require("../models/User");
const Lounge = require("../models/Lounge");
const BookingContract = require('../models/BookingContract')
const calculateAge = require('../utils/calcAge')


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
    const {host, loungeId, menuId, customerId, services, wed_date, shift, guest_amount, contract, bill, deposite, state}= req.body
    console.log(wed_date)
    //Validation
    if (req.user.role !== 'admin') return res.status(406).json({ success: false, message: 'Không có quyền truy cập'})

    if (!host.bride.name) return res.status(406).json ({success: false, message: 'Thiếu tên cô dâu ùi !'})
    if (!host.groom.name) return res.status(406).json ({success: false, message: 'Thiếu tên chú rể ùi !'})

    if (!wed_date) return res.status(406).json ({success: false, message: 'Nhập ngày diễn ra '})

    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(host.bride.name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})
    if (formatString.test(host.groom.name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    if (calculateAge(new Date(host.bride.birthday)) < 18) return res.status(406).json ({success: false, message: 'Cô dâu chưa đủ tuổi để cưới !'})
    if (calculateAge(new Date(host.groom.birthday)) < 20) return res.status(406).json ({success: false, message: 'Chú rể chưa đủ tuổi để cưới !'})

    const countBookingLounges = async (loungeId, date) => {
        const bookings = await BookingRecord.find({loungeId: loungeId, wed_date: date})
        return bookings.length
    }
    const countBookingRecords = async (date) => {
        const bookings = await BookingRecord.find({wed_date: date})
        return bookings.length
    }

    if (!loungeId) return res.status(406).json ({success: false, message: 'Chưa chọn sảnh cưới'})
    if (await countBookingLounges(loungeId, wed_date) === 1) return res.status(406).json ({success: false, message: `Ngày ${wed_date} đã có khách đặt sảnh` })
    if (await countBookingRecords(wed_date) >= 5) return res.status(406).json ({success: false, message: `Ngày ${wed_date} không còn sảnh, tối đa 5 sảnh hoạt động 1 ngày` })
    const dateDiff = (date1, date2) => {
        const difference_In_Time = date2.getTime() - date1.getTime();
        const difference_In_Days = difference_In_Time / (1000 * 3600 * 24);

        return difference_In_Days;
    }

    const lounge = await Lounge.findOne({_id: loungeId})

    if (guest_amount < 10 || !guest_amount)  return res.status(406).json ({success: false, message: `Số lượng khách mời ít nhất 10 người!` })
    if (guest_amount > lounge.capacity || !guest_amount)  return res.status(406).json ({success: false, message: `Số lượng khách mời ở sảnh ${lounge.name} nhiều nhất là ${lounge.capacity} người`})

    if (dateDiff(new Date(), new Date(wed_date)) < 30) return res.status(406).json ({success: false, message: 'Ngày diễn ra tiệc cưới phải cách hiện tại ít nhất 30 ngày!'})
    if (dateDiff(new Date(), new Date(wed_date)) > 90) return res.status(406).json ({success: false, message: 'Chỉ được đặt trước tối đa 90 ngày!'})

    try{
        const  newBookingRecord = new BookingRecord({host, loungeId, menuId, customerId, shift, services, wed_date, guest_amount, contract, bill, deposite, state})
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
    const { host, loungeId, menuId, services, wed_date, guest_amount, shift, contractId, state, requestConfirm, requestCancel, requestCheckout } = req.body

    if (req.user.role !== 'admin') return res.status(406).json({ success: false, message: 'Không có quyền truy cập'})

    if (!host.bride.name) return res.status(406).json ({success: false, message: 'Thiếu tên cô dâu ùi !'})
    if (!host.groom.name) return res.status(406).json ({success: false, message: 'Thiếu tên chú rể ùi !'})

    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(host.bride.name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})
    if (formatString.test(host.groom.name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    if (calculateAge(new Date(host.bride.birthday)) < 18) return res.status(406).json ({success: false, message: 'Cô dâu chưa đủ tuổi để cưới !'})
    if (calculateAge(new Date(host.groom.birthday)) < 20) return res.status(406).json ({success: false, message: 'Chú rể chưa đủ tuổi để cưới !'})

    const countBookingLounges = async (loungeId, date) => {
        const bookings = await BookingRecord.find({loungeId: loungeId, wed_date: date, _id: {$ne: req.params.id}})
        return bookings.length
    }
    const countBookingRecords = async (date) => {
        const bookings = await BookingRecord.find({wed_date: date , _id: {$ne: req.params.id}})
        return bookings.length
    }

    if (!loungeId) return res.status(406).json ({success: false, message: 'Chưa chọn sảnh cưới'})
    if (await countBookingLounges(loungeId, wed_date) === 1) return res.status(406).json ({success: false, message: `Ngày ${wed_date} đã có khách đặt sảnh` })
    if (await countBookingRecords(wed_date) >= 5) return res.status(406).json ({success: false, message: `Ngày ${wed_date} không còn sảnh, tối đa 5 sảnh hoạt động 1 ngày` })
    const dateDiff = (date1, date2) => {
        const difference_In_Time = date2.getTime() - date1.getTime();
        const difference_In_Days = difference_In_Time / (1000 * 3600 * 24);

        return difference_In_Days;
    }

    const lounge = await Lounge.findOne({_id: loungeId})

    if (guest_amount < 10 || !guest_amount)  return res.status(406).json ({success: false, message: `Số lượng khách mời ít nhất 10 người!` })
    if (guest_amount > lounge.capacity || !guest_amount)  return res.status(406).json ({success: false, message: `Số lượng khách mời ở sảnh ${lounge.name} nhiều nhất là ${lounge.capacity} người`})

    if (dateDiff(new Date(), new Date(wed_date)) < 30) return res.status(406).json ({success: false, message: 'Ngày diễn ra tiệc cưới phải cách hiện tại ít nhất 30 ngày!'})
    if (dateDiff(new Date(), new Date(wed_date)) > 90) return res.status(406).json ({success: false, message: 'Chỉ được đặt trước tối đa 90 ngày!'})

    // Simple validation
    let record;
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
            host, loungeId, menuId, services, wed_date, guest_amount, shift
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