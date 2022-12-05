const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')

const  Menu = require ('../models/Menu')

// @route GET api/menus
// @desc Get menu
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const menus = await Menu.find()
        res.json({ success: true, menus })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/menus
//@desc Create menu
//@access Private
router.post('/', async (req,res) =>{
    const {price,description,state,name,dishes}= req.body
    console.log(req.body)

    //Simple validation

    try{
        const  newMenu = new Menu({price,description,state: state || 'available',name, dishes})
        await newMenu.save()

        res.json ({success: true, message: 'Successfully,', post: newMenu})
    } catch (error){
        console.log(error)
        res.status(500).json ({success: false, message: 'Internal server error'})
    }
})

// @route PUT api/menus
// @desc Update menu
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { price,description,state,name,dishes } = req.body
    console.log(req.body)

    // Simple validation

    try {
        let updatedMenu = {
            price,
            description: description || '',
            state: state || 'Available',
            name,
            dishes
        }

        const menuUpdateCondition = {_id: req.params.id, user: req.userId}

        updatedMenu = await Menu.findOneAndUpdate(
            menuUpdateCondition,
            updatedMenu,
            {new: true}
        )

        // User not authorised to update menu or post not found
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
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route DELETE api/menus
// @desc Delete menu
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const menuDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedMenu= await Menu.findOneAndDelete(menuDeleteCondition)

        // User not authorised or menu not found
        if (!deletedMenu)
            return res.status(401).json({
                success: false,
                message: 'Menu not found or user not authorised'
            })

        res.json({ success: true, post: deletedMenu })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router