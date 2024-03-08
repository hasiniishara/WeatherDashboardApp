document.getElementById('search-button').addEventListener('click', function(){
   
    //Get the input from the input field
    const inputElement = document.getElementById('search-input');
    const userSearch = inputElement.value.trim();
    console.log(userSearch);

    //Check user input the value or not

    if(userSearch){
        fetchChatResponse(userSearch);
        inputElement.value = '';
    }
});

document.getElementById('clear-button').addEventListener('click', function(){
    document.getElementById('city-name').innerText ="City: "; ;
    document.getElementById('temperature').innerText ="Temperature: " ;
    document.getElementById('humidity').innerText ="Humidity: " ;
    document.getElementById('wind-speed').innerText ="Wind Speed: " ;
    document.getElementById('condition').innerText ="Weather Condition: " ;
    
});

function displayWeather (data){
    
    
    const weatherName = data.name;
    const rawTemp = data.main.temp;
    const fixTemp = Math.round(rawTemp);

    
    const cityW = document.getElementById('city-name');
    const temperatureW = document.getElementById('temperature');
    const humidityW = document.getElementById('humidity');
    const windspeedW = document.getElementById('wind-speed');
    const weatherCondi = document.getElementById('condition');

    if(weatherName === undefined) {
        cityW.innerText ="City: Incorrect City";
        temperatureW.innerText ="Temperature: ";
        humidityW.innerText ="Humidity: ";
        windspeedW.innerText ="Wind Speed: "; 
        weatherCondi.innerText ="Weather Condition: "; 
    }else {
        cityW.innerText =`City: ${data.name}`;
        temperatureW.innerText =`Temperature: ${fixTemp}`;
        humidityW.innerText =`Humidity: ${data.main.humidity}`;
        windspeedW.innerText =`Wind Speed: ${data.wind.speed}`; 
        weatherCondi.innerText =`Weather Condition: ${data.weather[0].main} `; 
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