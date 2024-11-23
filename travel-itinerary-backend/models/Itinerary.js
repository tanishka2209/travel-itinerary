const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  destination: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  travelers: Number,
  interests: [String],
  activities: [{
    day: Number,
    activity: String,
    description: String,
    image: String
  }]
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);