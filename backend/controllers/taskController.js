
const Task = require('../models/Task');

// Return only logged-in user tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a task for logged-in user
const addTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    try {
        if (!title) {
            return res.status(400).json({ message: 'Title is required'});
        }
        

        const task = await TaskController.create ({
            userId: req.user.id,
            title,
            description,
            deadline,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task for logged-in user
const updateTask = async (req, res) => {
    const {title, description, completed, deadline } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not allowed to change this task'});
        }
    
        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed ?? task.completed;
        task.deadline = deadline || task.deadline;

        const updateTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete task for logged-in user
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found'});

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not allowed to delete this task'});
        }
    
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };