const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')

const  Dish = require ('../models/Dish')

// @route GET api/dishs
// @desc Get dish
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const dishs = await Dish.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, dishs })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/dishs
//@desc Create dish
//@access Private
router.post('/', async (req,res) =>{
    const {description,state,name}= req.body
    console.log(req.body)

    //Simple validation

    try{
        const  newDish = new Dish({description,state: state || 'available',name})
        await newDish.save()

        res.json ({success: true, message: 'Successfully,', post: newDish})
    } catch (error){
        console.log(error)
        res.status(500).json ({success: false, message: 'Internal server error'})
    }
})

// @route PUT api/dishs
// @desc Update dish
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { description,state,name } = req.body

    // Simple validation


    try {
        let updatedDish = {

            description: description || '',
            state: state || 'Available',
            name,
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

// @route DELETE api/dishs
// @desc Delete dish
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const dishDeleteCondition = { _id: req.params.id, user: req.userId }
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