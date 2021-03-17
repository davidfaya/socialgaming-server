
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
require('dotenv').config()
const {UserInputError} = require('apollo-server')
const {validateRegisterInput} = require('../../utils/validators')
const {validateLoginInput} = require('../../utils/validators')


function generateJWT(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'} )
}
module.exports = {
    Query: {
        async getUser(_, {userId}) {

            try{
                const user = await User.findById(userId)
                if (user) 
                    return user 
                else throw new Error('User not found')

            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async login(_, {username, password}) {
            const {errors, valid} = validateLoginInput(username, password)
            const user = await User.findOne({username})
            if (!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors})
            }
            const match = await bcrypt.compare(password, user.password)
            if (!user) {
                errors.general = 'Wrong username/password'
                throw new UserInputError('Wrong username/password', {errors})
            }
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            const token = generateJWT(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, {registerInput: {username, email, password, confirmPassword}}
            , context, info) {
            // Validate user data
            const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }


            // Make user user doenst exists
            const user = await User.findOne({username})
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12)
         
            const newUser = new User({
                email, 
                username,
                password,
                image : 'molly.pnp', 
                createdAt : new Date().toISOString()

            })

            const res = await newUser.save()
            
            token = generateJWT(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}