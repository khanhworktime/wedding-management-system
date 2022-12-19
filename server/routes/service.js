const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  User = require('../models/User')
const  Service = require ('../models/Service')
const Lounge = require("../models/Lounge");

// @route GET api/services
// @desc Get services
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const services = await Service.find();
        return res.json({ success: true, services })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/lounges
//@desc Create lounge
//@access Private
router.post('/', verifyToken, async (req, res) =>{
    const {price,description,state,name, type} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try{
        const isExist = await Service.findOne({name: name})
        if(isExist) return res.status(406).json({success: false, message: 'Dịch vụ đã tồn tại ùi !'})

        const  newService = new Service({price,description: description?.trim(), name: name?.trim(), state: state || 'unavailable', type: type || "others"})
        await newService.save()

        return res.json ({success: true, message: 'Thêm mới thành công', service: newService})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route PUT api/lounges
// @desc Update lounge
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const {price,description,state,name, type} = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId })
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try {
        const isExist = await Service.findOne({name: name, _id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Dịch vụ đã tồn tại ùi !'})

        let updateService = {
            price,
            description: description?.trim(),
            state: state || 'unavailable',
            type: type || 'others',
            name: name?.trim(),
        }

        const serviceUpdateCond = {_id: req.params.id}

        updateService = await Service.findOneAndUpdate(
            serviceUpdateCond,
            updateService,
            { new: true }
        )

        // User not authorised to update lounge or post not found
        if (!updateService)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy dịch vụ'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            service: updateService
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

// @route DELETE api/services
// @desc Delete service
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try {
        const serviceDeleteCond = { _id: req.params.id }
        const deleteService = await Service.findOneAndDelete(serviceDeleteCond)

        // User not authorised or lounge not found
        if (!deleteService)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy dịch vụ'
            })

        res.json({ success: true, service: deleteService })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})
module.exports = router