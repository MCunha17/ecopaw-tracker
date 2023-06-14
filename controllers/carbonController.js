const Converter = require('length-distance-converter');
const CarbonAndMore = require('carbon-and-more-api');

const polarBearFacts = [
    'Polar bears have black skin to help absorb and retain heat.',
    'Polar bears can swim for long distances and reach up to speeds of up to 6 mph in the water.',
    'Polar bears have a layer of blubber that can be more than 10 cm thick, which helps keep them warm.',
];

const carbonController = {
    calculateEmissions: async (req, res) => {
        try {
            const { ferryOnFoot, classicBus, mediumHybridCar } = req.body;
            const converter = new Converter();
            
            const ferryOnFootKm = await converter.convert(ferryOnFoot, 'mi', 'km');
            const classicBusKm = await converter.convert(classicBus, 'mi', 'km');
            const mediumHybridCarKm = await converter.convert(mediumHybridCar, 'mi', 'km');

            const carbonApi = new CarbonAndMore('28a4dc5demsh9e1190bfece70cap19a028jsnd72a');

            const ferryEmissions = await carbonApi.publicTransit(ferryOnFootKm, 'FerryOnFoot');
            const busEmissions = await carbonApi.publicTransit(classicBusKm, 'ClassicBus');
            const carEmissions = await carbonApi.carTravel(mediumHybridCarKm, 'MediumHybridCar');

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

module.exports = carbonController;