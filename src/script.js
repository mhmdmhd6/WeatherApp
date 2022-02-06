/* Variebel start*/
const input = document.querySelector('.searchInput');
const button = document.querySelector('.searchButton');
const body = document.querySelector('body')
/* Variebel end*/

/*
// in function baraye avordan backgrounde bodye
function main(response) {
    console.log(response.data);
    const description = response.data.weather[0].description;
    console.log(description.split(' ').join('+'));
    body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${description.split(' ').join('+')})`;
}
*/
const cityName = 'آمل';

function featchWeather() {
    const apiKey = "60cc000b9167e964953aa85a43e74d51";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}
function displayWeather(response) {
    const description = response.data.weather[0].description;
    body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${description.split(' ').join('+')})`;
    document.querySelector('.cityName').innerHTML = cityName;
}

featchWeather();



                                        /******** previouse code backup *********/
/* 
 Variebel start
const input = document.querySelector('.searchInput');
const button = document.querySelector('.searchButton');
const body = document.querySelector('body')
Variebel end


// in function baraye avordan backgrounde bodye
function main(response) {
    console.log(response.data);
    const description = response.data.weather[0].description;
    console.log(description.split(' ').join('+'));
    body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${description.split(' ').join('+')})`;
}


const weather = {   
    featchWeather : function() {
        const apiKey = "60cc000b9167e964953aa85a43e74d51";
        const cityName = 'ساری';
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
        axios.get(`${apiUrl}&appid=${apiKey}`).then(weather.main);
    },
    main : function main(response) {
        console.log(response.data);
        const description = response.data.weather[0].description;
        console.log(description.split(' ').join('+'));
        body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${description.split(' ').join('+')})`;
    },
    
   displayWeather : function(response) {
       const name = response.data.name;
       console.log(name);
   }
}
weather.featchWeather();
*/