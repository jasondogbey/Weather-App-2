const weather = {
    apiKey: "cbe537d9d450fd70c57792406eac02d2",
    getWeather: function(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
        //const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=cbe537d9d450fd70c57792406eac02d2"
        fetch(url).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name: city, main: {temp, humidity}, weather: [{icon, description}], wind: {speed} } = data
        const tempInCelsius = (parseFloat(temp) - 273.15).toFixed(1)

        const cityName = document.querySelector(".city")
        cityName.textContent = city

        const tempElement = document.querySelector(".temp")
        tempElement.textContent = `${tempInCelsius}°C`

        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`

        const descriptionElement = document.querySelector(".description")
        descriptionElement.textContent = description

        const humidityElement = document.querySelector(".humidity")
        humidityElement.textContent = `${humidity}%`

        const windElement = document.querySelector(".wind-speed")
        windElement.textContent = `Wind speed: ${speed} km/h`

        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`
        

    },
    search: function() {
        const cityElement = document.querySelector(".search-box")
        const city = cityElement.value
        if (!city) {
            console.log("Please enter a city")
            return
        }
    
        weather.getWeather(city)

    }
}

const searchButton = document.getElementById("search-button")
searchButton.addEventListener("click", () => {
    weather.search()
})

document.querySelector(".search-box").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        weather.search()
    }
})

weather.getWeather("london")