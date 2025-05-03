const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');

router.route('/')
    .get(protect, getBookings)
    .post(protect, createBooking);

router.route('/:id')
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);

module.exports = router; 