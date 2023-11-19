const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers

    try {
        if(!authorization) {
            throw Error ('Authorization Required!')
        }
        const token = authorization.split(' ')[1]

        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')

        next()
    } catch (error) {
        res.status(401).json({error: 'Request is not authorized!'})
    }
}

module.exports = requireAuth