const axios = require('axios');
const convertUnits = require('convert-units');

const polarBearFacts = [
    'Polar bears have black skin to help absorb and retain heat.',
    'Polar bears can swim for long distances and reach up to speeds of up to 6 mph in the water.',
    'Polar bears have a layer of blubber that can be more than 10 cm thick, which helps keep them warm.',
];

const carbonController = {
    calculateEmissions: async (req, res) => {
        try {
            const { ferryOnFoot, classicBus, mediumHybridCar } = req.body;
            
            const ferryOnFootKm = convertUnits(ferryOnFoot).from('mi').to('km');
            const classicBusKm = convertUnits(classicBus).from('mi').to('km');
            const mediumHybridCarKm = convertUnits(mediumHybridCar).from('mi').to('km');

            const apiKey = '28a4dc5demsh9e1190bfece70cap19a028jsnd72a';
            const apiUrl = 'https://carbonfootprint1.p.rapidapi.com/'

            const ferryEmissions = await getPublicTransitEmissions(ferryOnFootKm, 'FerryOnFoot', apiKey, apiUrl);
            const busEmissions = await getPublicTransitEmissions(classicBusKm, 'ClassicBus', apiKey, apiUrl);
            const carEmissions = await getCarTravelEmissions(mediumHybridCarKm, 'MediumHybridCar', apiKey, apiUrl);

            const totalEmissions = ferryEmissions + busEmissions + carEmissions;
            const randomFact = polarBearFacts[Math.floor(Math.random() * polarBearFacts.length)];

            res.json({
                totalEmissions,
                randomFact,
                message: 'Here is your calculated carbon emissions. Thank you for making an effort to improve your carbon emissions! The polar bears thank you as well!!!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while calculating emissions' });
        }
    },
};

async function getPublicTransitEmissions(distance, type, apiKey, apiUrl) {
    try {
        const response = await axios.get(
            `${apiUrl}/CarbonFootprintFromPublicTransit`, {
                params: {
                    distance,
                    type,
                },
                headers: {
                    apiKey,
                    apiUrl
                },
            }
        );

        return response.data.emissions;
    } catch (error) {
        console.error(error);
    }
};

async function getCarTravelEmissions(distance, type, apiKey, apiUrl) {
    try {
        const response = await axios.get(
            `${apiUrl}/CarbonFootprintFromCarTravel`, {
                params: {
                    distance,
                    type,
                },
                headers: {
                    apiKey,
                    apiUrl
                },
            }
        );

        return response.data.emissions;
    } catch (error) {
        console.error(error);
    }
};

module.exports = carbonController;