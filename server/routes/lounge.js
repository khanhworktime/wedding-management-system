const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  User = require('../models/User')
const  Lounge = require ('../models/Lounge')

// @route GET api/lounges
// @desc Get lounge
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const lounges = await Lounge.find();
        return res.json({ success: true, lounges })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi kết nối server' })
    }
})

// @route GET api/lounges
// @desc Get lounge
// @access Private
router.post('/', verifyToken, async (req, res) =>{
    const {price,description,state,capacity,name, max_table, position} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    if (max_table < Math.ceil(capacity / 10))
        return res.status(406).json ({success: false, message: 'Số khách và số bàn chưa hợp lệ (Một bàn có tối đa 10 khách ) '})
    if (max_table > (Math.ceil(capacity / 10) + 10))
        return res.status(406).json ({success: false, message: 'Số khách và số bàn chưa hợp lệ (Chỉ được dư tối đa 10 bàn) '})

    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try{
        const isExist = await Lounge.findOne({name: name})
        if(isExist) return res.status(406).json({success: false, message: 'Sảnh đã tồn tại ùi !'})

        const  newLounge = new Lounge({price,description: description?.trim(),state: state || 'unavailable',capacity,name: name?.trim(), max_table, position: position?.trim()})
        await newLounge.save()

        return res.json ({success: true, message: 'Thêm mới thành công', lounge: newLounge})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route GET api/lounges
// @desc Get lounge
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { price,description,state,capacity,name, max_table, position } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    if (max_table < Math.ceil(capacity / 10))
        return res.status(406).json ({success: false, message: 'Số khách và số bàn chưa hợp lệ (Một bàn có tối đa 10 khách ) '})

    if (max_table >= (Math.ceil(capacity / 10) + 10))
        return res.status(406).json ({success: false, message: 'Số khách và số bàn chưa hợp lệ (Chỉ được dư tối đa 10 bàn) '})

    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})


    try {
        const isExist = await Lounge.findOne({name: name, _id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Sảnh đã tồn tại ùi !'})
        if (max_table > Math.ceil(capacity / 10) + 10)
            return res.status(406).json ({success: false, message: 'Số khách và số bàn chưa hợp lệ (Chỉ được dư tối đa 10 bàn) '})


        let updatedLounge = {
            price,description: description?.trim(),
            state: state || 'unavailable',
            capacity,name: name?.trim(),
            max_table,
            position: position?.trim()
        }

        const loungeUpdateCondition = {_id: req.params.id}

        updatedLounge = await Lounge.findOneAndUpdate(
            loungeUpdateCondition,
            updatedLounge,
            { new: true }
        )

        if (!updatedLounge)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy sảnh'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            lounge: updatedLounge
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

// @route DELETE api/lounges
// @desc Delete lounge
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try {
        const loungeDeleteCondition = { _id: req.params.id }
        const deletedLounge = await Lounge.findOneAndDelete(loungeDeleteCondition)


        if (!deletedLounge)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy sảnh'
            })

        res.json({ success: true, lounge: deletedLounge })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

module.exports = router