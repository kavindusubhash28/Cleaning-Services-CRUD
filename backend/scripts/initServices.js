require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

const defaultServices = [
    {
        name: "Basic House Cleaning",
        description: "Standard cleaning service including dusting, vacuuming, mopping, and basic sanitization.",
        icon: "🧹",
        price: 80,
        duration: "2-3 hours"
    },
    {
        name: "Deep Cleaning",
        description: "Thorough cleaning of all areas including hard-to-reach spots and detailed sanitization.",
        icon: "🛁",
        price: 150,
        duration: "4-6 hours"
    },
    {
        name: "Window Cleaning",
        description: "Professional cleaning of all windows, frames, and sills, inside and out.",
        icon: "🪟",
        price: 100,
        duration: "2-4 hours"
    },
    {
        name: "Laundry and Folding",
        description: "Wash, dry, fold, and organize your laundry with care.",
        icon: "🧺",
        price: 60,
        duration: "2-3 hours"
    },
    {
        name: "Kitchen Cleaning",
        description: "Deep cleaning of all kitchen surfaces, appliances, and organization.",
        icon: "🧽",
        price: 90,
        duration: "2-3 hours"
    },
    {
        name: "Bathroom Sanitization",
        description: "Complete sanitization and deep cleaning of all bathroom fixtures and surfaces.",
        icon: "🚽",
        price: 70,
        duration: "1-2 hours"
    },
    {
        name: "Post-Construction Cleaning",
        description: "Thorough cleaning after construction or renovation work.",
        icon: "🧯",
        price: 200,
        duration: "6-8 hours"
    },
    {
        name: "Office Cleaning",
        description: "Professional cleaning services for office spaces and commercial properties.",
        icon: "🏢",
        price: 120,
        duration: "3-4 hours"
    },
    {
        name: "Mattress & Upholstery Cleaning",
        description: "Deep cleaning of mattresses, sofas, and other upholstered furniture.",
        icon: "🛏",
        price: 110,
        duration: "2-3 hours"
    },
    {
        name: "Pet-Friendly Cleaning",
        description: "Specialized cleaning service focusing on pet-related messes and odors.",
        icon: "🐾",
        price: 100,
        duration: "2-3 hours"
    },
    {
        name: "Night Shift Cleaning",
        description: "Cleaning services available during night hours for businesses.",
        icon: "🌙",
        price: 140,
        duration: "4-6 hours"
    },
    {
        name: "Move-In / Move-Out Cleaning",
        description: "Detailed cleaning service for moving situations.",
        icon: "🏠",
        price: 160,
        duration: "4-5 hours"
    },
    {
        name: "Fridge & Oven Cleaning",
        description: "Deep cleaning of kitchen appliances including refrigerator and oven.",
        icon: "🧊",
        price: 80,
        duration: "2-3 hours"
    },
    {
        name: "Exterior Power Washing",
        description: "High-pressure cleaning of exterior surfaces, driveways, and patios.",
        icon: "🏘",
        price: 180,
        duration: "3-4 hours"
    },
    {
        name: "Eco-Friendly Cleaning",
        description: "Environmentally conscious cleaning using green products and methods.",
        icon: "🧼",
        price: 100,
        duration: "2-3 hours"
    }
];

const initializeServices = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert new services
        const services = await Service.insertMany(defaultServices);
        console.log(`Successfully initialized ${services.length} services`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

initializeServices(); 