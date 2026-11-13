
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    eventDate: { type: Date, required: true },
    notes: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Pending',
    }
});

module.exports = mongoose.model('Task', taskSchema);
