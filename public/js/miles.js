document.querySelector('.submit-car-miles').addEventListener('click', function(){
    let miles = document.querySelector('.car-miles-input').value;
    sendEmissionData({ mediumHybridCar: miles });
  });
  
  document.querySelector('.submit-public-miles').addEventListener('click', function(){
    let miles = document.querySelector('.public-miles-input').value;
    sendEmissionData({ classicBus: miles });
  });
  
  document.querySelector('.submit-walk-miles').addEventListener('click', function(){
    let miles = document.querySelector('.walk-miles-input').value;
    sendEmissionData({ ferryOnFoot: miles });
  });
  
  function sendEmissionData(data) {
    fetch('/calculateEmissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      document.querySelector('.miles-saved-output').innerHTML = `Your carbon footprint for this trip was: ${data.totalEmissions} kg of CO2. ${data.message} Fun fact: ${data.randomFact}`;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }