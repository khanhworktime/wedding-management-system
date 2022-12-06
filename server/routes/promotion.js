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
        return res.status(500).json({ success: false, message: 'Internal server error' })
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
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try{

        const  newPromotion = new Promotion({name: name?.trim(),state: state || 'unavailable',start_at,end_at,description: description?.trim(),discount_value,lounge_id,menu_id, service_id})
        await newPromotion.save()

        return res.json ({success: true, message: 'Successfully,', lounge: newPromotion})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Internal server error'})
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
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try {


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

        // User not authorised to update promotin or promotion not found
        if (!updatedPromotion)
            return res.status(401).json({
                success: false,
                message: 'Promotion not found'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedPromotion
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/promotions
// @desc Delete promotion
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try {
        const promotionDeleteCondition = { _id: req.params.id }
        const deletedPromotion = await Lounge.findOneAndDelete(promotionDeleteCondition)

        // User not authorised or promotion not found
        if (!deletedPromotion)
            return res.status(401).json({
                success: false,
                message: 'Promotion not found'
            })

        res.json({ success: true, promotion: deletedPromotion })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router