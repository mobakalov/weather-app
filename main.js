const key='2e8369b27045bb8d0e04362b6f8d1382';

const form = document.querySelector('#searchCityData');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let cityName = event.path[0][0].value;
    loadData(cityName);
});

const getWeather = async (city) => {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`);
    const data = await result.json();
    const cityWeather = {
        name: data.name,
        forecast: data.weather[0].main,
        currentTemp: Math.floor(data.main.temp),
        lowTemp: Math.floor(data.main.temp_min),
        highTemp: Math.floor(data.main.temp_max),
        humidity: data.main.humidity,
    }
    return cityWeather
}


const DOM_Elements = {
    weatherDetails: '.weather-details'
};

const createList = (name, forecast, currentTemp, lowTemp, highTemp, humidity) => {
    const html = 
    `<div class='container2' id='${name.toLowerCase()}'><ul>`+
        `<li>${name}</li>` +
        `<li>Today Theres ${forecast}</li>` +
        `<li>Current Temperature: ${currentTemp}°F</li>` +
        `<li>Lowest Temp: ${lowTemp}°F</li>` +
        `<li>Highest Temp: ${highTemp}°F</li>` +
        `<li>Humidity: ${humidity}%</li>` +
    "</ul></div>";
    document.querySelector(DOM_Elements.weatherDetails).insertAdjacentHTML('beforeend', html);
    console.log(name)
    console.log(currentTemp)
    console.log(forecast)
};

const loadData = async (name) => {
    const answer = await getWeather(name);
    createList(answer.name, answer.forecast, answer.currentTemp, answer.lowTemp, answer.highTemp, answer.humidity);
}
