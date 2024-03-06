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


function displayWeather (weather){
    
    console.log(`weather is ${weather.name}`);
    
    const cityW = document.getElementById('city-name');
    const temperatureW = document.getElementById('temperature');
    const humidityW = document.getElementById('humidity');
    const windspeedW = document.getElementById('wind-speed');

    cityW.innerText =`City: ${weather.name}`;
    temperatureW.innerText =`Temperature: ${weather.main.temp}`;
    humidityW.innerText =`Humidity: ${weather.main.humidity}`;
    windspeedW.innerText =`Wind Speed: ${weather.wind.speed}`;  

}

async function fetchChatResponse (userSearch){
    console.log(userSearch);
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