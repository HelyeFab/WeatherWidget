// API KEY
//  14b3d6d5ed27a0717ef604567497302d
document.addEventListener("DOMContentLoaded", function () {
    const iconElement = document.querySelector('.weather__container-icon');

    const tempElement = document.querySelector('.weather__container-tempValue');
    const tempDesc = document.querySelector('.weather__container-tempDesc');
    const locationElement = document.querySelector('.weather__container-location');
    const notification = document.querySelector('.notification');
    const convertBtn = document.querySelector('.btn');


    // Creating Weather object
    const weather = {

    };

    weather.temperature = {
        unit: "celsius"
    }

    // APP CONSTS AND VARS
    const kelvin = 273;
    const apiKey = '14b3d6d5ed27a0717ef604567497302d';

    // CHECKING IF BROWSER SUPPORT GEOLOCATION
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        notification.style.display = 'block';
        notification.innerHTML = "<p>Browser doesn't support Geolocation</p>";
    }

    // Setting User position, setting Error Function and getting the weather from API

    function setPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);

    };

    function showError(error) {
        notification.style.display = 'block';
        notification.innerHTML = `<p>${error.message}</p>`;
    }

    function getWeather(latitude, longitude) {
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        console.log(api);

        fetch(api)
            .then(function (response) {
                let data = response.json();
                return data;
            })
            .then(function (data) {
                let apiTemp = weather.temperature.value = Math.floor(data.main.temp - kelvin);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;

            })
            .then(function () {
                displayWeather();
            })
    }

    function displayWeather() {
        iconElement.innerHTML = `<img src = "/resources/icons/${weather.iconId}.png">`
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        tempDesc.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;

    }

    function convertTemp(temperature) {
        return (temperature * 9 / 5) + 32;
    }


    convertBtn.addEventListener('click', function () {
        if (weather.temperature.value === undefined) return;
        if (weather.temperature.unit === 'celsius') {
            let fahrenheit = convertTemp(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);
            tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
            weather.temperature.unit = 'fahrenheit';
            convertBtn.innerHTML = `<a href="#">C</a>`;

        } else {
            tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
            weather.temperature.unit = 'celsius';

            convertBtn.innerHTML = `<a href="#">F</a>`;
        }

    })

})
