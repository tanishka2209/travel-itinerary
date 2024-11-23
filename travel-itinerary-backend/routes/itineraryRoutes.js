const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');
const { generateItinerary } = require('../services/itineraryGenerator');

router.post('/generate-itinerary', async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, travelers, interests } = req.body;

    const generatedItinerary = await generateItinerary(destination, startDate, endDate, budget, travelers, interests);
    
    const newItinerary = new Itinerary({
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      interests,
      activities: generatedItinerary.activities
    });

    res.status(201).json(newItinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ message: 'Error generating itinerary', error: error.message });
  }
});

module.exports = router;