const axios = require('axios');
const convertUnits = require('convert-units');

const apiKey = '1d4fd72b78msh5a0c805967281bbp1d8af6jsn55a9c3044359';
const apiHost = 'carbonfootprint1.p.rapidapi.com';
const apiURL = 'https://carbonfootprint1.p.rapidapi.com';

const polarBearFacts = [
  'Polar bears have black skin to help absorb and retain heat.',
  'Polar bears can swim for long distances and reach up to speeds of up to 6 mph in the water.',
  'Polar bears have a layer of blubber that can be more than 10 cm thick, which helps keep them warm.',
];

async function calculateEmissions(req, res) {
    try {
      const { ferryOnFoot, classicBus, mediumHybridCar } = req.body;
  
      const ferryOnFootKm = convertUnits(ferryOnFoot).from('mi').to('km');
      const classicBusKm = convertUnits(classicBus).from('mi').to('km');
      const mediumHybridCarKm = convertUnits(mediumHybridCar).from('mi').to('km');
  
      const walkEmissions = await getPublicTransitEmissions(ferryOnFootKm, 'FerryOnFoot', apiKey, apiURL, apiHost);
      const publicTransEmissions = await getPublicTransitEmissions(classicBusKm, 'ClassicBus', apiKey, apiURL, apiHost);
      const carEmissions = await getCarTravelEmissions(mediumHybridCarKm, 'MediumHybridCar', apiKey, apiURL, apiHost);
  
      const totalEmissions = walkEmissions + publicTransEmissions + carEmissions;
      const randomFact = polarBearFacts[Math.floor(Math.random() * polarBearFacts.length)];
  
      res.json({
        totalEmissions,
        randomFact,
        message: 'Here is your calculated carbon emissions. Thank you for making an effort to reduce your carbon footprint!',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while calculating emissions' });
    }
  }
  
  async function getPublicTransitEmissions(distance, type, apiKey, apiUrl, apiHost) {
    try {
      const response = await axios.get(`${apiUrl}/CarbonFootprintFromPublicTransit`, {
        params: {
          distance,
          type,
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost,
        },
      });
  
      return response.data.emissions;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve public transit emissions');
    }
  }
  
  async function getCarTravelEmissions(distance, type, apiKey, apiUrl, apiHost) {
    try {
      const response = await axios.get(`${apiUrl}/CarbonFootprintFromCarTravel`, {
        params: {
          distance,
          type,
        },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
        },
      });
  
      return response.data.emissions;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve car travel emissions');
    }
  }
  
  module.exports = {
    calculateEmissions,
  };