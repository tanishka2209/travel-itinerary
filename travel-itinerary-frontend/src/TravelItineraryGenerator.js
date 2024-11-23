import React, { useState } from 'react';
import { FaCalendarAlt, FaMoneyBillWave, FaUserFriends, FaMapMarkerAlt, FaImage, FaPlus } from 'react-icons/fa';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const TravelItineraryGenerator = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [budget, setBudget] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState([]);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const [interestOptions, setInterestOptions] = useState([
    { label: 'Beach' },
    { label: 'Hiking' },
    { label: 'Food' },
    { label: 'Culture' },
  ]);

  const handleInterestToggle = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const addNewInterest = () => {
    if (newInterest && !interestOptions.some(option => option.label.toLowerCase() === newInterest.toLowerCase())) {
      setInterestOptions([...interestOptions, { label: newInterest }]);
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const generateItinerary = async () => {
    setLoading(true);
    try {
      let url = "https://travel-iternary-one.vercel.app/api/generate-itinerary"
      if (process.env.NODE_ENV === 'deployment') {
        url = "https://travel-iternary-one.vercel.app/api/generate-itinerary"
      }
      else
      {
        url = "http://127.0.0.1:5000/api/generate-itinerary"
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          startDate: dateRange[0].startDate,
          endDate: dateRange[0].endDate,
          budget,
          travelers,
          interests,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedItinerary(data);
      } else {
        console.error('Error generating itinerary');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Personalized Travel Itinerary Generator</h2>
          <div className="space-y-6">
            {/* Travel Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Travel Dates</label>
              <div className="mt-1">
                <DateRangePicker
                  onChange={(item) => setDateRange([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={dateRange}
                  direction="horizontal"
                  className="w-full"
                />
              </div>
            </div>

            {/* Budget Input */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMoneyBillWave className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>

            {/* Travelers Input */}
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">Number of Travelers</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserFriends className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="travelers"
                  id="travelers"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Destination Input */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Interest Selection */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Interests</span>
              <div className="flex flex-wrap gap-2 mb-2">
                {interestOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleInterestToggle(option.label)}
                    className={`flex items-center px-4 py-2 rounded-full ${
                      interests.includes(option.label)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add new interest"
                  className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={addNewInterest}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" />
                  Add
                </button>
              </div>
            </div>

            {/* Generate Itinerary Button */}
            <div>
              <button
                onClick={generateItinerary}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Itinerary'}
              </button>
            </div>
          </div>
        </div>

        {/* Display the Generated Itinerary */}
        {generatedItinerary && (
          <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Personalized Itinerary</h3>
            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Destination</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {destination}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Travel Dates</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                  </dd>
                </div>

                <div className="py-4 sm:py-5">
                  <dt className="text-xl font-semibold text-gray-900 mb-4">Daily Activities</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {generatedItinerary.activities.map((item, index) => (
                      <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                        <h4 className="text-lg font-semibold text-indigo-600">Day {item.day}</h4>
                        <p className="text-base font-medium mt-2">{item.activity}</p>
                        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelItineraryGenerator;