const  express = require('express')
const  router = express.Router()
const verifyToken = require('../middleware/auth')
const  Party = require ('../models/Party')
const User = require("../models/User");




// @route GET api/parties
// @desc Get party
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const parties = await Party.find();
        return res.json({ success: true, parties })
    } catch (error) {

        return res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

//@route POST api/parties
//@desc Create party
//@access Private
router.post('/', verifyToken, async (req,res) =>{
    const {state, record, employees}= req.body

    //Simple validation

    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }

    try{
        const  newParty = new Party({record, state: state || 'unavailable', employees })
        await newParty.save()

        return  res.json ({success: true, message: 'Thêm mới thành công', party: newParty})
    } catch (error){
        return res.status(500).json ({success: false, message: 'Lỗi xử lý server'})
    }
})


// @route PUT api/parties
// @desc Update party
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const {state, record, employees } = req.body

    // Simple validation
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    try {
        let updatedParty = {
            state: state || 'unavailable',
            record, employees
        }

        const partyUpdateCondition = {_id: req.params.id}

        updatedParty = await Party.findOneAndUpdate(
            partyUpdateCondition,
            updatedParty,
            {new: true}
        )

        if (!updatedParty)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy tiệc'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            party: updatedParty
        })
    } catch (error) {
        res.status(500).json({success: false, message: 'Lỗi xử lý server'})
    }
})



// @route DELETE api/parties
// @desc Delete party
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({_id: req.userId})
    if (user.role !== 'admin') {
        return res.status(403).json({success: false, message: 'Không có quyền truy cập'})
    }
    try {
        const partyDeleteCondition = {_id: req.params.id}
        const deletedParty= await Party.findOneAndDelete(partyDeleteCondition)


        if (!deletedParty)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy tiệc'
            })

        res.json({ success: true, party: deletedParty})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi xử lý server' })
    }
})

module.exports = router