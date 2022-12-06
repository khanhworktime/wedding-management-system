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
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/lounges
//@desc Create lounge
//@access Private
router.post('/', verifyToken, async (req, res) =>{
    const {price,description,state,capacity,name, max_table, position} = req.body
    //Simple validation
    const user = await User.findOne({_id: req.userId})

    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try{
        const isExist = await Lounge.findOne({name: name})
        if(isExist) return res.status(406).json({success: false, message: 'Sảnh đã tồn tại ùi !'})

        const  newLounge = new Lounge({price,description: description.trim(),state: state || 'unavailable',capacity,name: name.trim(), max_table, position: position.trim()})
        await newLounge.save()

        return res.json ({success: true, message: 'Successfully,', post: newLounge})
    } catch (error){
        console.log(error)
        return res.status(500).json ({success: false, message: 'Internal server error'})
    }
})

// @route PUT api/lounges
// @desc Update lounge
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { price,description,state,capacity,name, max_table, position } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try {
        const isExist = await Lounge.findOne({name: name, _id: {$ne: req.params.id}})
        if(isExist) return res.status(406).json({success: false, message: 'Sảnh đã tồn tại ùi !'})

        let updatedLounge = {
            price,description: description.trim(),
            state: state || 'unavailable',
            capacity,name: name.trim(),
            max_table,
            position: position.trim()
        }

        const loungeUpdateCondition = {_id: req.params.id}

        updatedLounge = await Lounge.findOneAndUpdate(
            loungeUpdateCondition,
            updatedLounge,
            { new: true }
        )

        // User not authorised to update lounge or post not found
        if (!updatedLounge)
            return res.status(401).json({
                success: false,
                message: 'Lounge not found'
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

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Don\'t have permission'})
    }

    try {
        const loungeDeleteCondition = { _id: req.params.id }
        const deletedLounge = await Lounge.findOneAndDelete(loungeDeleteCondition)

        // User not authorised or lounge not found
        if (!deletedLounge)
            return res.status(401).json({
                success: false,
                message: 'Lounge not found'
            })

        res.json({ success: true, post: deletedLounge })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router