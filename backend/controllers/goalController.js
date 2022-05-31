const asyncHandler = require('express-async-handler')


//@desc get goals
//@route GET /api/goals
//@acces PRIVATE

const getGoals = asyncHandler (async(req, res) => {
    res.status(200).json({message: 'get goals'})
})


//@desc set goal
//@route post /api/goals
//@acces PRIVATE

const setGoal = asyncHandler (async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text');
    }else {
        console.log(req.body)
        res.status(200).json({message: 'set goals'})
    }
 })


//@desc put goal
//@route PUT /api/goals/:id
//@acces PRIVATE

const putGoal = asyncHandler (async(req, res) => {
    res.status(200).json({message:`Update goals; ${req.params.id}`})
})


//@desc delete goal
//@route delete /api/goals/:id
//@acces PRIVATE

const deleteGoal = asyncHandler (async(req, res) => {
    res.status(200).json({message: `Delete goals ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}