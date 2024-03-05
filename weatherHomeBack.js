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


// function displayWeather (message, sender){
    
    
//     const cityW = document.getElementById('city-name');
//     const temperatureW = document.getElementById('city-name');
//     const humidityW = document.getElementById('city-name');
//     const windspeedW = document.getElementById('city-name');

//     cityW.innerText ="";
//     temperatureW.innerText ="";
//     humidityW.innerText ="";
//     windspeedW.innerText ="";  

// }

async function fetchChatResponse (userSearch){
    console.log(userSearch);
    const apiKey = '454dcf8be544f4822cb24cfead8501ec';

    try{
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}&units=metric';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
       // const replyFromBot =data.choices[0].message.content.trim();
       // displayMessage(replyFromBot, 'bot')
    }catch (error){
        console.log('Error', error);
    }

}