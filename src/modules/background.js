import { timeCalculator, dateCalculator, sunsetSunrise } from "./weather"
async function background(name) {
    const key = `uSDNPf3adwZ3YRXQEmCfL3WJVpRdgFY9M5i9VEV2iZ4`
    const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=${name}&per_page=30&order_by=popular&orientation=landscape&page=${random(3)}`
    const image = await fetch(url)
    const response = await image.json()
    console.log(response)
    handler(response)
}

const handler = (photos) => {
    clearInterval(photoShow)
    let photoArray = photos.results
    let i = 1
    let defaultPic = photoArray[0]
    photo(defaultPic)
    function photoShow() {
        let pic = photoArray[i]
        photo(pic)
        console.log(pic.urls.regular)
        if (i == photoArray.length - 1) {
            i = 0
        } else {
            i++
        }
    }
    setInterval(photoShow, 8000);
}

function photo(pic) {
    backgroundHandler(pic.urls.regular + `&w=${screen.width}&h=${screen.height}`)
}

const backgroundHandler = (photo) => {
    const div = document.querySelector('body')
    div.setAttribute('style', `background:url(${photo}); background-repeat:no-repeat; background-size:cover;`)
}
const random = (num) => {
    console.log(num)
    let number = Math.floor(Math.random() * num)
    console.log(number)
    return number
}

export const bgHandler = (data) => {
    const today = new Date(dateCalculator(new Date(), data.timezone))
    const time = timeCalculator(today)
    const sunrise = sunsetSunrise(data.sys.sunrise, data.timezone)
    const sunset = sunsetSunrise(data.sys.sunset, data.timezone)
    console.log(sunrise, sunset, time)

    if (sunrise < time && time < sunset) {
        dayBgHandler(time, data)
    } else {
        nightBgHandler(data)
    }
}

const dayBgHandler = (time, data) => {
    if (time < "12:00") {
        tempHandler(data, 'morning')
    } else if (time > '12:00' && time < "5:00") {
        tempHandler(data, "noon")
    } else if (time > "5:00") {
        tempHandler(data, "evening")
    }
}

const nightBgHandler = (data) => {
    tempHandler(data, 'night')
}

const tempHandler = (data, time) => {
    let temp = data.main.temp
    if (temp > "30") {
        background(`${time}-hot-${mainWeather(data)}`)
    } else if (temp < '30' && temp > '15') {
        background(`${time}-warm sunny-${mainWeather(data)}`)
    } else if (temp < '15' && temp > '1') {
        background(`${time}-cold-${mainWeather(data)}`)
    } else if (temp < "1") {
        background(`${time}-snow-${mainWeather(data)}`)
    }
}

const mainWeather = (data) => {
    const weather = data.weather[0].main
    return weather
}
