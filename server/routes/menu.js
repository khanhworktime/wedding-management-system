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
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/menus
//@desc Create menu
//@access Private
router.post('/', async (req,res) =>{
    const {description,state,name,soup, salad, main, dessert, other} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try{
        const menuPrice = soup.reduce((sum, item) => sum + item.price, 0) + salad.reduce((sum, item) => sum + item.price, 0) + main.reduce((sum, item) => sum + item.price, 0) + other.reduce((sum, item) => sum + item.price, 0) + dessert.reduce((sum, item) => sum + item.price, 0)

        const newMenu = new Menu({price: menuPrice, description:description.trim(),state: state || 'available',name,soup, salad, main, dessert, other})
        await newMenu.save()

        res.json ({success: true, message: 'Successfully,', post: newMenu})
    } catch (error){
        return  res.status(500).json ({success: false, message: 'Internal server error'})
    }
})

// @route PUT api/menus// @desc Update menu
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { price,description,state,name,soup, salad, main, dessert, other } = req.body
    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
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

        // User not authorised to update menu or menu not found
        if (!updatedMenu)
            return res.status(401).json({
                success: false,
                message: 'Menu not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedMenu
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route DELETE api/menus
// @desc Delete menu
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }
    try {
        const menuDeleteCondition = {_id: req.params.id}
        const deletedMenu= await Menu.findOneAndDelete(menuDeleteCondition)

        // User not authorised or menu not found
        if (!deletedMenu)
            return res.status(401).json({
                success: false,
                message: 'Menu not found'
            })

        res.json({ success: true, menu: deletedMenu })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router