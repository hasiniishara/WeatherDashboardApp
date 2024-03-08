document.getElementById('search-button').addEventListener('click', function(){
    // IMplementation Steps
    // Step:1 Get the input from the input field
    const inputElement = document.getElementById('search-input');
    const userSearch = inputElement.value.trim();
    console.log(userSearch);

    // Step:2 Display the Messages from the User Input

    if(userSearch){
        // Step:3 Fetch the GPT assistance reponse and show the reponse in the chatbx
        fetchChatResponse(userSearch);
        inputElement.value = '';
    }
})


function displayWeather (data){
    
    
    const weatherName = data.name;
    const rawTemp = data.main.temp;
    const fixTemp = Math.round(rawTemp);

    console.log(fixTemp);
    
    const cityW = document.getElementById('city-name');
    const temperatureW = document.getElementById('temperature');
    const humidityW = document.getElementById('humidity');
    const windspeedW = document.getElementById('wind-speed');

    if(weatherName === undefined) {
        cityW.innerText ="City: Incorrect City";
        temperatureW.innerText ="Temperature: ";
        humidityW.innerText ="Humidity: ";
        windspeedW.innerText ="Wind Speed: "; 
    }else {
        cityW.innerText =`City: ${data.name}`;
        temperatureW.innerText =`Temperature: ${data.main.temp}`;
        humidityW.innerText =`Humidity: ${data.main.humidity}`;
        windspeedW.innerText =`Wind Speed: ${data.wind.speed}`; 
    }
    
    const des = data.weather[0].main;
    if(des === "Clear"){
        console.log("Clear");
    }else if (des === "Clouds") {
        console.log("Clouds");
    }else {
        console.log("not");
    }

}

async function fetchChatResponse (userSearch){
    const apiKey = '454dcf8be544f4822cb24cfead8501ec';

    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
       displayWeather(data);
    }catch (error){
        console.log('Error', error);
    }

}