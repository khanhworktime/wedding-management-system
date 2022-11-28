const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')

const  Lounge = require ('../models/Lounge')

// @route GET api/lounges
// @desc Get lounges
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const lounges = await Lounge.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, lounges })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route LOUNGE api/Lounge
//@desc Create Lounge
//@access Private
router.post('/', async (req,res) =>{
    const {price,description,state,capacity,name}= req.body
    console.log(req.body)

    //Simple validation

    try{
        const  newLounge = new Lounge({price,description,state: state || 'available',capacity,name})
        await newLounge.save()

        res.json ({success: true, message: 'Successfully,', post: newLounge})
    } catch (error){
        console.log(error)
        res.status(500).json ({success: false, message: 'Internal server error'})
    }
})

// @route PUT api/lounges
// @desc Update lounge
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { price,description,state,capacity,name } = req.body

    // Simple validation


    try {
        let updatedLounge = {
            price,
            description: description || '',
            state: state || 'Available',
            capacity,
            name,
        }

        const loungeUpdateCondition = { _id: req.params.id, user: req.userId }

        updatedLounge = await Lounge.findOneAndUpdate(
            loungeUpdateCondition,
            updatedLounge,
            { new: true }
        )

        // User not authorised to update lounge or post not found
        if (!updatedLounge)
            return res.status(401).json({
                success: false,
                message: 'Lounge not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: updatedLounge
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/lounges
// @desc Delete lounge
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const loungeDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedLounge = await Lounge.findOneAndDelete(loungeDeleteCondition)

        // User not authorised or lounge not found
        if (!deletedLounge)
            return res.status(401).json({
                success: false,
                message: 'Lounge not found or user not authorised'
            })

        res.json({ success: true, post: deletedLounge })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router