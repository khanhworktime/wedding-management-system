const jwt = require('jsonwebtoken')
const User = require("../models/User");
const verifyToken = (req, res, next) => {
    const authHeader = req.header('authorization')
    const token = authHeader ? authHeader.split(' ')[1] : undefined;

    if (!token)
        return res.status(401).json({success: false, message: 'Access token not found'})

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        User.findOne({_id: req.userId},).then(r => {
            req.user = r;
            next()
        })
    } catch (error){
        console.log(error)
        return  res.status(403).json({success: false, message: 'Invalid token'})
    }
}
module.exports = verifyToken

