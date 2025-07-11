const apiKey = '66d2ca95c55ae380564876ed7e210a02'; 

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDiv = document.getElementById('weatherResult');

  if (city === '') {
    weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found.');
      }
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { temp, humidity } = data.main;
      const condition = data.weather[0].description;

      weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Condition:</strong> ${condition}</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
