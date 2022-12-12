const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  Dish = require ('../models/Dish')
const User = require("../models/User")
const Customer = require("../models/Customer");

// @route GET api/dishes
// @desc Get dish
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const dishes = await Dish.find();
        return res.json({ success: true, dishes })
    } catch (error) {

        return res.status(500).json({ success: false, message: 'Lỗi kêt nối server' })
    }
})
//@route POST api/dishes
//@desc Create dish
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {description,state,name,price,type,order}= req.body

    //Simple validation

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    try{
        const isExist = await Dish.findOne({name: name, _id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Món ăn đã tồn tại ùi !'})
        const  newDish = new Dish({description: description?.trim(),state: state || 'unavailable',name: name?.trim(),price,type,order})
        await newDish.save()

        return  res.json ({success: true, message: 'Thêm mới thành công', dish: newDish})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi kết nối server'})
    }
})

// @route PUT api/dishes
// @desc Update dish
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { description,state,name,price,type,order } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})


    try {
        const isExist = await Dish.findOne({name: name, _id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Món ăn đã tồn tại ùi !'})

        let updatedDish = {
            description: description?.trim(),
            state: state || 'unavailable',
            name: name?.trim(),
            price,
            type,
            order
        }

        const dishUpdateCondition = {_id: req.params.id}

        updatedDish = await Dish.findOneAndUpdate(
            dishUpdateCondition,
            updatedDish,
            {new: true}
        )


        if (!updatedDish)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy món ăn'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            dish: updatedDish
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Lỗi kết nối server'})
    }
})

// @route DELETE api/dishes
// @desc Delete dish
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    try {
        const dishDeleteCondition = {_id: req.params.id}
        const deletedDish= await Dish.findOneAndDelete(dishDeleteCondition)

        // User not authorised or dish not found
        if (!deletedDish)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy món ăn'
            })

        res.json({ success: true, dish: deletedDish })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi kết nối server' })
    }
})

module.exports = router