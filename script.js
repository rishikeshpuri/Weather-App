const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



const apiKey = '7f122d7bdde59e9f958fe316f77d8d63'; // I have created in openweathermap site

const url = (city) => 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByCity(city){
    const response = await fetch(url(city), 
                    {
                        origin: "cors"
                    });
    const data = await response.json();
    console.log(data, KelvinToCelsius(data.main.temp));
    addWeatherToPage(data)
}

function addWeatherToPage(data){
    const temp = KelvinToCelsius(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
        
    `;

    // clean up
    main.innerHTML = '';

    main.appendChild(weather);
}

function KelvinToCelsius(kelvin){
    return (kelvin - 273.15).toFixed(2);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const city = search.value;
    if(city){
        getWeatherByCity(city);
    }

});
// getWeatherByCity('Delhi');