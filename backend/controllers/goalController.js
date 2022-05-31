const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Goal = require('../models/goalModel')

//@desc get goals
//@route GET /api/goals
//@acces PRIVATE

const getGoals = asyncHandler (async(req, res) => {
    const goals = await Goal.find({user:req.user.id}).lean()
    res.status(200).json(goals)
})


//@desc set goal
//@route post /api/goals
//@acces PRIVATE

const setGoal = asyncHandler (async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text');
    }else {
       const goal = await Goal.create({
           text:req.body.text,
           user: req.user.id
       })
        res.status(200).json(goal)
    }
 })


//@desc put goal
//@route PUT /api/goals/:id
//@acces PRIVATE

const putGoal = asyncHandler (async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    } else {
    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not foud')
    }
    
    //make sure the logged in user matches the goal user
    if(goal.user.toString !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const putGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(putGoal)
    }
})


//@desc delete goal
//@route delete /api/goals/:id
//@acces PRIVATE

const deleteGoal = asyncHandler (async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    } else {
    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not foud')
    }
    
    //make sure the logged in user matches the goal user
    if(goal.user.toString !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
    }
})


module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}