const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//@desc Authenticate a user
//@route post /api/users/login
//@acces Public

const loginUser =  asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //check user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc get user
//@route get /api/users/me
//@acces Public

const getUser =  asyncHandler(async(req, res) => {
    res.send('Hi')
})

//@desc register a new user
//@route post /api/users
//@acces Public

const registerUser =  asyncHandler(async(req, res) => {
    const { name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    } else {

        //check if user exists
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error ('User already exist')
        }

        //hash password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //create user 

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        if(user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data')
        }
        
    }
})



module.exports = {
    loginUser,
    getUser,
    registerUser,
}