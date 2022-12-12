const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  Menu = require ('../models/Menu')
const User = require("../models/User")

// @route GET api/menus
// @desc Get menu
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const menus = await Menu.find()
        res.json({ success: true, menus })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/menus
//@desc Create menu
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {description,state,name,soup, salad, main, dessert, other, price} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})
    try{
        const isExist = await Menu.findOne({name: name})
        if(isExist) return res.status(406).json({success: false, message: 'Menu đã tồn tại ùi !'})

        const newMenu = new Menu({price, description:description?.trim(),state: state || 'available',name: name?.trim(),soup, salad, main, dessert, other})
        await newMenu.save()

        res.json ({success: true, message: 'Thêm mới thành công', menu: newMenu})
    } catch (error){
        console.log(error)
        return  res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route PUT api/menus// @desc Update menu
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { price,description,state,name,soup, salad, main, dessert, other } = req.body
    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    const formatString = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (formatString.test(name)) return res.status(406).json ({success: false, message: 'Tên không được chứa kí tự đặc biệt !'})

    const isExist = await Menu.findOne({name: name, _id: {$ne: req.params.id}})
    if(isExist) return res.status(406).json({success: false, message: 'Menu đã tồn tại ùi !'})

    try {
        let updatedMenu = {
            price,
            description: description?.trim(),
            state: state || 'Available',
            name: name?.trim(),
            soup, salad, main, dessert, other
        }

        const menuUpdateCondition = {_id: req.params.id}

        updatedMenu = await Menu.findOneAndUpdate(
            menuUpdateCondition,
            updatedMenu,
            {new: true}
        )


        if (!updatedMenu)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy menu'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            menu: updatedMenu
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Lỗi xử lý server'})
    }
})

// @route DELETE api/menus
// @desc Delete menu
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    try {
        const menuDeleteCondition = {_id: req.params.id}
        const deletedMenu= await Menu.findOneAndDelete(menuDeleteCondition)

        // User not authorised or menu not found
        if (!deletedMenu)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy menu'
            })

        res.json({ success: true, menu: deletedMenu })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

module.exports = router