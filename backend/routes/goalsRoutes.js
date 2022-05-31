const express = require('express')
const router = express.Router()
const { getGoals, setGoal, putGoal, deleteGoal } = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(putGoal).delete(deleteGoal)


// router.get('/', getGoals)
// router.post('/', setGoal)
// router.put('/:id', putGoal)
// router.delete('/:id', deleteGoal)
   


module.exports = router