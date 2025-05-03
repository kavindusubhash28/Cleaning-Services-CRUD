const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: [true, 'Please provide customer name'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please provide address']
    },
    date_time: {
        type: Date,
        required: [true, 'Please provide date and time']
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema); 