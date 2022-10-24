export async function background() {
    // setTimeout(background, 5000)
    const key = `uSDNPf3adwZ3YRXQEmCfL3WJVpRdgFY9M5i9VEV2iZ4`
    const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=sexy-girl&page=${random(5)}`
    const image = await fetch(url)
    const response = await image.json()
    handler(response)
}

const handler = (photos) => {
    let photo=photos.results[random(photos.results.length)]

    backgroundHandler(photo.urls.regular)
    console.log(photo.urls.regular)
}


const backgroundHandler=(photo)=>{
    const div=document.getElementById('wrapper')
    div.setAttribute('style', `background:url(${photo}); background-repeat:no-repeat;`)

}


const random=(num)=>{
    let number=Math.floor(Math.random()*num)
    return number
}