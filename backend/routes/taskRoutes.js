
const express = require('express');
const { getTasks, addTask, updateTask, deleteTask, getAllTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

//Customer routes
router.route('/').get(protect, getTasks).post(protect, addTask);

//Admin routes
router.get('/all', protect, adminOnly, getAllTasks);
router.put('/:id/status', protect, adminOnly, updateTaskStatus);

//Customer edit/cancel bookings
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;