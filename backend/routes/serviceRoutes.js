const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getServices,
    createService,
    updateService,
    deleteService,
    initializeServices
} = require('../controllers/serviceController');

// Public routes
router.get('/', getServices);

// Protected routes (admin only)
router.post('/', protect, createService);
router.post('/init', protect, initializeServices);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router; 