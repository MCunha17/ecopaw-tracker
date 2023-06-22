const convert = require('convert-units');
const axios = require('axios');
const apiKey = require('../config/apiKey.js');

const calculateEmissions = async (req, res) => {
    // Parse the values from the request body
    let carMiles = req.body.carMiles;
    let publicTransMiles = req.body.publicTransMiles;

    // Convert miles to kilometers using convert-units library
    const carKm = convert(carMiles).from('mi').to('km');
    const publicTransKm = convert(publicTransMiles).from('mi').to('km');

    // Log the conversion results
    console.log(`Car miles converted to kilometers: ${carKm}`);
    console.log(`Public transport miles converted to kilometers: ${publicTransKm}`);   

    // Prepare the headers and params for the request to the Carbon Footprint API for car emissions
    const carOptions = {
        method: 'GET',
        url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel',
        params: {
            distance: carKm,
            vehicle: 'MediumDieselCar'
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
        }
    };

    // Prepare the headers and params for the request to the Carbon Footprint API for car emissions
    const publicTransOptions = {
        method: 'GET',
        url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit',
        params: {
            distance: publicTransKm,
            type: 'ClassicBus'
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
        }
      };

      try {
        // Send requests to the Carbonfootprint API for both car and public transport
        const carEmissionsResponse = await axios.request(carOptions);
        const publicTransEmissionsResponse = await axios.request(publicTransOptions);
    
        // Log responses
        console.log("Car Emissions Response:", carEmissionsResponse.data);
        console.log("Public Transport Emissions Response:", publicTransEmissionsResponse.data);
    
        // Extract the emission values
        let carEmission = carEmissionsResponse.data.carbonEquivalent;
        let publicTransEmission = publicTransEmissionsResponse.data.carbonEquivalent;
    
        // Calculate total emissions
        let totalEmissions = (parseFloat(carEmission) + parseFloat(publicTransEmission)).toFixed(1);
    
        // Log total emissions
        console.log("Total Emissions:", totalEmissions);

        // Send the total emissions as a JSON response
        res.json({ totalEmissions });
    } catch (error) {
        // If error, send 500 status code and error message
        console.error(error);
        res.status(500).send('Error calculating emissions.');
  }
};

// Export calculateEmissions function
module.exports = { calculateEmissions };