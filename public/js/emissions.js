<script>
    document.addEventListener('DOMContentLoaded', () => {
        const carTravelBtn = document.querySelector('.car-travel');
        const publicTravelBtn = document.querySelector('.public-travel');
        const emissionsForm = document.querySelector('#emissions-form');
        const calculateBtn = document.querySelector('#calculateBtn');
        const emissionsSaved = document.querySelector('#emissionsSaved');
        const carMilesInput = document.querySelector('#carMiles');
        const publicTransMilesInput = document.querySelector('#publicTransMiles');

        // Show emissions form when car travel button is clicked
        carTravelBtn.addEventListener('click', () => {
            emissionsForm.style.display = 'block';
        });

        // Show emissions form when public transportation button is clicked
        publicTravelBtn.addEventListener('click', () => {
            emissionsForm.style.display = 'block';
        });

        // Calculate emissions saved when calculate button is clicked
        calculateBtn.addEventListener('click', async () => {
            const carMiles = parseFloat(carMilesInput.value);
            const publicTransMiles = parseFloat(publicTransMilesInput.value);

            const response = await calculateEmissionsSaved(carMiles, publicTransMiles);

            if (response.success) {
                const totalEmissions = response.totalEmissions.toFixed(1); // Round to the nearest tenth
                emissionsSaved.textContent = `${totalEmissions} kg CO2e`;
            } else {
                emissionsSaved.textContent = 'Error calculating emissions';
            }

            // Hide the emissions form and show the emissions result
            emissionsForm.style.display = 'none';
            emissionsSaved.style.display = 'block';
        });

        // Function to calculate emissions saved
        async function calculateEmissionsSaved(carMiles, publicTransMiles) {
            try {
                const response = await fetch('/calculate-emissions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        carMiles,
                        publicTransMiles
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return { success: true, totalEmissions: data.totalEmissions };
                } else {
                    return { success: false };
                }
            } catch (error) {
                console.error(error);
                return { success: false };
            }
        }
    });
</script>