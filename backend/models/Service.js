const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        trim: true
    },
    icon: {
        type: String,
        required: [true, 'Service icon is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Service price is required'],
        min: 0
    },
    duration: {
        type: String,
        required: [true, 'Service duration is required'],
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema); 