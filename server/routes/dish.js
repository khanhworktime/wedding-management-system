const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')

const  Dish = require ('../models/Dish')
const User = require("../models/User")

// @route GET api/dishes
// @desc Get dish
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const dishes = await Dish.find();
        return res.json({ success: true, dishes })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
//@route POST api/dishes
//@desc Create dish
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {description,state,name,price,type,order}= req.body
    console.log(req.body)

    //Simple validation

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try{
        const  newDish = new Dish({description,state: state || 'available',name,price,type,order})
        await newDish.save()

        return  res.json ({success: true, message: 'Successfully,', post: newDish})
    } catch (error){
        console.log(error)
        return res.status(500).json ({success: false, message: 'Internal server error'})
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
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }


    try {
        let updatedDish = {
            description: description || '',
            state: state || 'unavailable',
            name,
            price,
            type,
            order
        }

        const dishUpdateCondition = {_id: req.params.id, user: req.userId}

        updatedDish = await Dish.findOneAndUpdate(
            dishUpdateCondition,
            updatedDish,
            {new: true}
        )

        // User not authorised to update dish or post not found
        if (!updatedDish)
            return res.status(401).json({
                success: false,
                message: 'Dish not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedDish
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route DELETE api/dishes
// @desc Delete dish
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }
    try {
        const dishDeleteCondition = {_id: req.params.id}
        const deletedDish= await Dish.findOneAndDelete(dishDeleteCondition)

        // User not authorised or dish not found
        if (!deletedDish)
            return res.status(401).json({
                success: false,
                message: 'Dish not found or user not authorised'
            })

        res.json({ success: true, post: deletedDish })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router