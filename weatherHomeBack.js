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

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  };
  
  let orginalTemp;
  let isFahrenheit = false;


  document.getElementById('toggleSwitch').addEventListener('change', function() {

    

    const unitText = document.getElementById('unitText');
    const cTempt = document.getElementById('temperature').textContent.trim();
    const numericPart = cTempt.replace("Temperature: ", "");

    

    if(orginalTemp === undefined){
        orginalTemp = parseFloat(numericPart);
        console.log(orginalTemp);
    }
    
    let numericValue = parseFloat(numericPart);

    if (isNaN(numericValue) && isFahrenheit === false) {
        alert("Please enter a valid temperature value first.");
        this.checked = !this.checked; 
        return;
    }else{
    
    if (this.checked) {
      unitText.textContent = 'F°';
      isFahrenheit = true;
      console.log('Switch is toggled ON');
       numericValue = celsiusToFahrenheit(numericValue);
      //document.getElementById('temperature').innerText = `Temperature: ${fTempt}`;
    } else {
      unitText.textContent = 'C°';
     // document.getElementById('temperature').innerText = `Temperature: ${numericPart}`;
      console.log('Switch is toggled OFF');
       numericValue = orginalTemp;
       console.log(numericValue);
       console.log(numericValue);
    }

        document.getElementById('temperature').textContent = `Temperature: ${numericValue}`;
}
  });
