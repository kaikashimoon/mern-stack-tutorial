const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

//@desc get goals
//@route GET /api/goals
//@acces PRIVATE

const getGoals = asyncHandler (async(req, res) => {
    const goals = await Goal.find({}).lean()
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