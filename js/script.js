// the function that gets the weather data based on the user input from openweathermap
async function getAPI() {
    //get the city name input from the document
    const city = document.getElementById("city").value;
    //the api key
    const apiKey = "c64d7668cb1d9f17c66e969f65db2938";
    //the url to get the geographic coordinates of the city, included with openweathermap
    const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

        //wait for response from the api
        const responseGeo = await fetch(urlGeo);
        //convert the response to JSON
        const geoData = await responseGeo.json();

        
         //extract the geographic data from the response
        const { lat, lon, name, country, state } = geoData[0];
        //use the geographic data to fetch the current weather data 
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        //wait for response from openweathermap api
        const responseWeather = await fetch(urlWeather);
        //convert the response to JSON
        const weatherData = await responseWeather.json();
        //HTML string to display the information
        const output = `
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="weather icon" width="200" height="200">
            <h2>${name}, ${state}, ${country}</h2>
            <p><b>Weather: </b>${weatherData.weather[0].description}</p>
            <p><b>Temperature:</b> ${weatherData.main.temp} °C</p>
            
        `;
        //insert the HTML string into the div with ID weatherDiv
        document.getElementById("weatherDiv").innerHTML = output;
    } 

