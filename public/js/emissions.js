document.addEventListener('DOMContentLoaded', function() {
    // Attach an event handler to the form submit event
    document.getElementById('emissions-form').addEventListener('submit', function(e) {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the form data
        var carMiles = document.getElementById('carMiles').value;
        var publicTransMiles = document.getElementById('publicTransMiles').value;

        // Make a POST request to the server
        fetch('/calculate-emissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carMiles: carMiles,
                publicTransMiles: publicTransMiles
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update the total emissions on the page
            document.getElementById('total-emissions').textContent = data.totalEmissions;
        })
        .catch((error) => {
            // Handle error here
            console.error('Error:', error);
        });
    });
});