async function weather(cityName) {
	const key = "6c2338a6c10581189e98989a14fa4b65";
	try{
		const weather=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${key}`, { mode: "cors" })
		if(weather.ok===false) throw new Error("city not found")
		const response=await weather.json()
		console.log(response)
	}catch(error){
		console.log(error)
	}
		
}

export { weather };
