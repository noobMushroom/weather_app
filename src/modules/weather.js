import { bgHandler } from './background'

async function weather(cityName) {
	const key = "6c2338a6c10581189e98989a14fa4b65";
	try {
		const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${key}&units=metric`, { mode: "cors" })
		if (weather.ok === false) throw new Error("city not found")
		const response = await weather.json()
		showWeather(response)
		bgHandler(response)
		
	} catch (error) {
		console.log(error)
		alert(error)
	}

}

function showWeather(data) {
	const maxTemp = document.getElementById('maxTemperature')
	maxTemp.innerHTML = `${data.main.temp_max}&deg;C`
	const minTemp = document.getElementById("minTemperature")
	minTemp.innerHTML = `${data.main.temp_min}&deg;C`
	const temperature = document.getElementById("temperature");
	temperature.innerHTML = `${data.main.temp}&deg;C`
	const pressure = document.getElementById('pressure')
	pressure.innerHTML = (data.main.pressure)
	const humidity = document.getElementById('humidity')
	humidity.innerHTML = (data.main.humidity);
	const feelsLike = document.getElementById("feelLike");
	feelsLike.innerHTML = `${data.main.feels_like}&deg;C`

	const visibility = document.getElementById("visibility")
	visibility.innerHTML = data.visibility

	const country = document.getElementById('country')
	country.innerHTML = `<h2>${data.sys.country}</h2>`
	const city = document.getElementById("city");
	city.innerHTML = data.name

	const sunrise = document.getElementById('sunriseTime')
	sunrise.innerHTML = sunsetSunrise(data.sys.sunrise, data.timezone)

	const sunset = document.getElementById("sunsetTime")
	sunset.innerHTML = sunsetSunrise(data.sys.sunset, data.timezone)

	const windSpeed = document.getElementById("wind")
	windSpeed.innerHTML = data.wind.speed

	const deg = document.getElementById("deg")
	deg.innerHTML = data.wind.deg

	data.weather.forEach(element => {
		const clouds = document.getElementById("weather");
		clouds.innerHTML = (element.main)
		const cloudInfo = document.getElementById("cloud");
		cloudInfo.innerHTML = (element.description)
		const img = document.getElementById('img')
		img.innerHTML = ''
		let weatherIcon = new Image()
		weatherIcon.src = `http://openweathermap.org/img/wn/${element.icon}.png`
		img.appendChild(weatherIcon)

	})

	dateTime(data.timezone)
}


function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

const dateTime = (timeOffset) => {
	const days = ['sun', 'Mon', 'Tue', 'Wed', 'Thurs', "Fri", "Sat"]
	const months = ['Jan', 'Feb', "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
	let cityTime = new Date(dateCalculator(new Date(), timeOffset))

	const day = cityTime.getDay()

	const todayDay = padTo2Digits(cityTime.getDate());

	const timeDiv = document.getElementById('time');
	timeDiv.innerHTML = `${days[day]} ${timeCalculator(cityTime)}`

	const dateDiv = document.getElementById('date');
	dateDiv.innerHTML = `${months[cityTime.getMonth()]}-${cityTime.getFullYear()}-${todayDay}`
}


const dateCalculator = (date, time) => {
	let today = date
	let localTime = today.getTime()
	let localOffset = today.getTimezoneOffset() * 60000
	let utc = localTime + localOffset
	let currentTime = utc + (1000 * time)

	return currentTime
}

const timeCalculator = (date) => {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;

	return time;
}

const sunsetSunrise = (date, offset) => {
	let today = dateCalculator(new Date(date * 1000), offset);
	let newDate = new Date(today)
	let time = timeCalculator(newDate)

	return time
}

export { weather, timeCalculator, dateCalculator, sunsetSunrise };
