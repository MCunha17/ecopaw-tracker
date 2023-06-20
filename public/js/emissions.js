document.addEventListener('DOMContentLoaded', () => {
    const emissionsForm = document.querySelector('#emissions-form');
    const calculateBtn = document.querySelector('#calculateBtn');
    const emissionsSaved = document.querySelector('#emissionsSaved');

    calculateBtn.addEventListener('click', () => {
        const carMiles = parseFloat(document.querySelector('#carMiles').value);
        const publicTransMiles = parseFloat(document.querySelector('#publicTransMiles').value);

        fetch('/calculate-emissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carMiles,
                publicTransMiles
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            emissionsSaved.textContent = `${data.totalEmissions} kg CO2e`;
            emissionsSaved.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            emissionsSaved.textContent = 'Error calculating emissions';
            emissionsSaved.style.display = 'block';
        });
    });
});