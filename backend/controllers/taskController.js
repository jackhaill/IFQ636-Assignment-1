
const Task = require('../models/Task');

//Validate booking details
const validateTask = ({ service, guests, eventDate }) => {
    if (!service || !guests || !eventDate) {
        return 'Service, Number of Guests, and Date is required';
    }

    const date = new Date(eventDate);
    if (isNaN(date.getTime())) {
        return 'Event date is not a valid date';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date <= today) {
        return 'Event must be in the future';
    }

    const guestCount = Number(guests);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 1000) {
        return 'Guests must be a number between 1 and 1000';
    }

    return null;
};

// Return only logged-in user bookings
const getTasks = async (req, res) => {
    try {
        const tasks = (await Task.find({ userId: req.user.id })).toSorted({ eventDate: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a booking request for logged-in user
const addTask = async (req, res) => {
    const { service, guests, eventDate, notes } = req.body;
    try {
        const problem = validateTask({ service, guests, eventDate});
        if (problem) return res.status(400).json({ message: problem });
     
        const task = await Task.create ({
            userId: req.user.id,
            service,
            guests,
            eventDate,
            notes,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a pending booking for logged-in user
const updateTask = async (req, res) => {
    const {service, guests, eventDate, notes } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Booking not found' });

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not allowed to change this booking' });
        }
        if (task.status !== 'Pending') {
            return res.status(400).json({ message: 'Only pending bookings can be edited.' });
        }
    
        const problem = validateTask({ service, guests, eventDate });
        if (problem) return res.status(400).json({ message: problem });

        task.service = service;
        task.guests = guests;
        task.eventDate = eventDate;
        task.notes = notes; 

        const updateTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete/cancel booking for logged-in user
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Booking not found' });

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not allowed to delete this booking' });
        }
        if (task.status !== 'Pending') {
            return res.status(400).json({ message: 'Only pending bookings can be cancelled' });
        }

        task.status = 'Cancelled';
        const updateTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Admin: Get every booking
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('userId', 'name', 'email')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Admin: Approve/reject pending bookings
const updateTaskStatus = async (req, res) => {
    const { status } = req.body;
    try {
        if (status !== 'Approved' && status !== 'Rejected') {
            return res.status(400).json({ message: 'Status must be Approved or Rejected' });
        }

        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Booking not found' });

        if (task.status !== 'Pending') {
            return res.status(400).json({ message: 'Only pending bookings can be approved or rejected' });
        }

        task.status = status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask, getAllTasks, updateTaskStatus };