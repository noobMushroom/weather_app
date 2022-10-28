import { timeCalculator, dateCalculator, sunsetSunrise } from "./weather"
async function background(name) {
    const key = `uSDNPf3adwZ3YRXQEmCfL3WJVpRdgFY9M5i9VEV2iZ4`
    const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=${name}&per_page=30&order_by=popular&orientation=landscape&page=${random(2)}`
    const image = await fetch(url)
    const response = await image.json()
    handler(response.results)
}


// // todo finish this
// const handler = (photos) => {
//     let photo = () => {
//         photo.loop = setInterval(() => {
//             photo.display();
//         }, 3000);
//     };
//     photo.array = photos;
//     photo.i = 0;
//     photo.display = () => {
//         backgroundHandler(photo.array[photo.i].urls.regular + `&w=${screen.width}&h=${screen.height}`)
//         photo.i++;
//         if (photo.i > photo.array.length - 1) { photo.stop(); }
//     };
//     photo.stop = () => {
//         clearInterval(photo.loop);
//     };
//     return { photo}
// }




const handler=(photos)=>{
    let num=random(photos.length)
    let pic=photos[num]
    backgroundHandler(pic.urls.regular + `&w=${screen.width}&h=${screen.height}`)
}


const backgroundHandler = (photo) => {
    const div = document.querySelector('body')
    div.setAttribute('style', `background:url(${photo}); background-repeat:no-repeat; background-size:cover;`)
}
const random = (num) => {
    let number = Math.floor(Math.random() * num)
    return number
}

export const bgHandler = (data) => {
    const today = new Date(dateCalculator(new Date(), data.timezone))
    const time = timeCalculator(today)
    const sunrise = sunsetSunrise(data.sys.sunrise, data.timezone)
    const sunset = sunsetSunrise(data.sys.sunset, data.timezone)
    if (sunrise < time && time < sunset) {
        dayBgHandler(time, data)
    } else {
        nightBgHandler(data)
    }
}

const dayBgHandler = (time, data) => {
    if (time < "12:00") {
        tempHandler(data, 'sunrise')
    } else if (time > '12:00' && time < "5:00") {
        tempHandler(data, "noon")
    } else if (time > "5:00") {
        tempHandler(data, "sunset")
    }
}

const nightBgHandler = (data) => {
    tempHandler(data, 'night')
}

const tempHandler = (data, time) => {
    let temp = data.main.temp
    if (temp > "30") {
        background(`${time}-${mainWeather(data)}-hot`)
    } else if (temp < '30' && temp > '15') {
        background(`${time}-${mainWeather(data)}-warm sunny`)
    } else if (temp < '15' && temp > '1') {
        background(`${time}-${mainWeather(data)}-cold`)
    } else if (temp < "1") {
        background(`${time}-${mainWeather(data)}-snow`)
    }
}

const mainWeather = (data) => {
    const weather = data.weather[0].main
    return weather
}
