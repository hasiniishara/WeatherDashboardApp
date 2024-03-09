//Click Search Button
document.getElementById('search-button').addEventListener('click', function(){
   
    //Get the input from the input field
    const inputElement = document.getElementById('search-input');
    //Trim the user input
    const userSearch = inputElement.value.trim();
    console.log(userSearch);

    //Check user input the value or not
    if(userSearch){
        fetchChatResponse(userSearch);
        //Clear input field after clicking the search button.
        inputElement.value = '';
    }
});

//Click Clear screen button
document.getElementById('clear-button').addEventListener('click', function(){

    //Set empty value for all fields
    document.getElementById('city-name').innerText ="City: "; ;
    document.getElementById('temperature').innerText ="Temperature: " ;
    document.getElementById('humidity').innerText ="Humidity: " ;
    document.getElementById('wind-speed').innerText ="Wind Speed: " ;
    document.getElementById('condition').innerText ="Weather Condition: " ;
    
});

//Define two varibales for toggle opertaion
  let orginalTemp;
  let isFahrenheit = false;

//Click toggle icon
document.getElementById('toggleSwitch').addEventListener('change', function() {
    //Get toggle text
    const unitText = document.getElementById('unitText');
    //Get current display celcious value
    const cTempt = document.getElementById('temperature').textContent.trim();
    //Get only numarical part
    const numericPart = cTempt.replace("Temperature: ", "");
 
    //Current value is undefine
    if(orginalTemp === undefined){
        //If currently no value in orginalTemp then assign current display celcious value
        orginalTemp = parseFloat(numericPart);
        console.log(orginalTemp);
    }
    
    //Create another varibale & assign current display value again to the new variable
    let numericValue = parseFloat(numericPart);
    //Check temperature field has a value or not for toggle oepration
    if (isNaN(numericValue)) {
        //If no value then view the alert
        alert("Please enter a valid temperature value first.");
        //reset the toggle option to previosu stage
        this.checked = !this.checked; 
        return;
    }
    
    //If user change toggle(Current toggle in celcious)
    if (this.checked) {
     //Set the toggle text to F°
      unitText.textContent = 'F°';
      //Set true
      isFahrenheit = true;
      //Call clecious convert to faranheit function & set the value to the varibale.
      numericValue = celsiusToFahrenheit(numericValue);
    } else {
      //If user toggle off the switch again, show toggle text as C°
      unitText.textContent = 'C°';
      //Check isFahrenheit is true(means that user click the toggle & currently toggle in faranheit stage).
      if(isFahrenheit){
        //Display Celcious value
        numericValue = Math.round((numericValue - 32) * 5/9);
        //Set false
        isFahrenheit = false;
      }else {
        //Otherwise keep the orgin celcious
        numericValue = orginalTemp;
      }
    }
        // Set Temperature to the screen
        document.getElementById('temperature').textContent = `Temperature: ${numericValue}`;
  });

//Create a function to display weather data.
function displayWeather (data){
    
    //Getting response status
    const weatherStaus = data.cod;
    console.log(weatherStaus);
    
    //Get field elements
    const cityW = document.getElementById('city-name');
    const temperatureW = document.getElementById('temperature');
    const humidityW = document.getElementById('humidity');
    const windspeedW = document.getElementById('wind-speed');
    const weatherCondi = document.getElementById('condition');

    //Check if the response is success or not
    if(weatherStaus == 404) {
        //If the city is not found then set below values
        cityW.innerText ="City: Incorrect City";
        temperatureW.innerText ="Temperature: ";
        humidityW.innerText ="Humidity: ";
        windspeedW.innerText ="Wind Speed: "; 
        weatherCondi.innerText ="Weather Condition: "; 
    }else {
        //If the city is found,
        //Get temperature & round off
        const rawTemp = data.main.temp;
        const fixTemp = Math.round(rawTemp);

        //Set the values
        cityW.innerText =`City: ${data.name}`;
        temperatureW.innerText =`Temperature: ${fixTemp}`;
        humidityW.innerText =`Humidity: ${data.main.humidity}`;
        windspeedW.innerText =`Wind Speed: ${data.wind.speed}`; 
        weatherCondi.innerText =`Weather Condition: ${data.weather[0].main} `; 
    }
}

//Create function for Fetch the data
async function fetchChatResponse (userSearch){
    //API key
    const apiKey = '454dcf8be544f4822cb24cfead8501ec';
    //Function call
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

//Create a function for calculatiing faranheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  };
  
  