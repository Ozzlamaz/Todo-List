const Task = require('../models/tasksModel')
const mongoose = require('mongoose')

// get all tasks
const getTasks = async(req, res) => {

    const user_id = req.user_id
    const tasks = await Task.find({user_id}).sort({completed: 1, updatedAt: -1})

    res.status(200).json(tasks)
};

//get a task
const getTask = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    };

    const task = await Task.findById(id);

    if (!task) {
        return res.status(200).json({error: 'No such task'})
    }

    res.status(200).json(task);
};

// create a new task
const createTask = async(req, res) => {
    const {title, color, completed} = req.body

    if(!title) {
        return res.status(400).json({error: 'Please fill the required field', title})
    }

    try {
        const user_id = req.user._id
        const task = await Task.create({title, color, completed, user_id})
        return res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// update a task
const updateTask = async (req, res) => {
    const {id} = req.params

    const task = await Task.findByIdAndUpdate(id, {...req.body})
    
    if(!task) {
        return res.status(400).json({error: 'no such task'})
    }

    res.status(200).json(task)
};

// delete a task
const deleteTask = async (req, res) => {
    const {id} = req.params

    const task = await Task.findByIdAndDelete(id)
    
    if(!task) {
        return res.status(400).json({error: 'no such task'})
    }

    res.status(200).json(task)
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}
