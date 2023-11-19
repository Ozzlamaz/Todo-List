const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/tasksController')

const router = express.Router();

// check auth
router.use(requireAuth)

// get all tasks
router.get('/', getTasks);

// get a task
router.get('/:id', getTask);

// create a new task
router.post('/', createTask);

// update a task
router.patch('/:id', updateTask);

// delete a task
router.delete('/:id', deleteTask);

module.exports = router