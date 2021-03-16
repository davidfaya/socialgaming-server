const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')
require('dotenv').config()

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        //Bearer <token>
        const token = authHeader.split('Bearer ')[1] //second value should be token
        //console.log(token)
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
                return user
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired JWT')
            }
        }
        throw new Error('JWT must be \'Bearer [token]')
    }
    throw new Error('Authorization header must be provided with JWT')
}