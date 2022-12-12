const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  User = require('../models/User')
const  Promotion = require ('../models/Promotion')



// @route GET api/promotions
// @desc Get promotion
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const promotions = await Promotion.find();
        return res.json({ success: true, promotions })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

// @route GET api/promotions
// @desc Get promotion
// @access Private
router.post('/', verifyToken, async (req, res) =>{
    const {name,state, start_at, end_at, description, discount_value,lounge_id, service_id, menu_id} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})

    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try{
        const isExist = await Promotion.findOne({name: name})
        if(isExist) return res.status(406).json({success: false, message: 'Khuyến mãi đã tồn tại ùi !'})

        const  newPromotion = new Promotion({name: name?.trim(),state: state || 'unavailable',start_at,end_at,description: description?.trim(),discount_value,lounge_id,menu_id, service_id})
        await newPromotion.save()

        return res.json ({success: true, message: 'Thêm mới thành công', lounge: newPromotion})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route GET api/promotions
// @desc Get promotion
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const {name,state, start_at, end_at, description, discount_value,lounge_id, service_id, menu_id} = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try {
        const isExist = await Promotion.findOne({name: name, _id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Khuyến mãi đã tồn tại ùi !'})


        let updatedPromotion = {
            name: name?.trim(), start_at, end_at,
            description: description?.trim(),
            state: state || 'unavailable',
            name: name.trim(),
            discount_value, lounge_id, service_id, menu_id
        }

        const promotionUpdateCondition = {_id: req.params.id}

        updatedPromotion = await Lounge.findOneAndUpdate(
            promotionUpdateCondition,
            updatedPromotion,
            { new: true }
        )


        if (!updatedPromotion)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy chương trình khuyến mãi'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            post: updatedPromotion
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

// @route DELETE api/promotions
// @desc Delete promotion
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try {
        const promotionDeleteCondition = { _id: req.params.id }
        const deletedPromotion = await Lounge.findOneAndDelete(promotionDeleteCondition)

        // User not authorised or promotion not found
        if (!deletedPromotion)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy chương trình khuyến mãi'
            })

        res.json({ success: true, promotion: deletedPromotion })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

module.exports = router