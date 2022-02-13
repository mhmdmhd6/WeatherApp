"use strict";
let cityName = "آمل";
const audio = new Audio('rain.mp3', { scope: '../WeatherApp/sound' });
const body = document.querySelector("body");

function featchWeather() {
  const apiKey = "60cc000b9167e964953aa85a43e74d51";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fa`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}
function displayWeather(response) {
  // const weatherMain = response.data.weather[0].main + " " + "sky";
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const humidity = response.data.main.humidity;
  const temp = response.data.main.temp;
  const icon = response.data.weather[0].icon;
  /*
  body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${weatherMain
    .split(" ")
    .join("+")})`;
    */
  document.querySelector(
    ".icon"
  ).src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  document.querySelector(".cityName").innerHTML = cityName;
  document.querySelector(".description").innerHTML = description;
  document.querySelector(".windSpeed").innerHTML =
    "سرعت باد : " + wind + " کیلومتر / ساعت";
  document.querySelector(".temp").innerHTML = temp + "°";
  document.querySelector(".humidity").innerHTML = "رطوبت : " + humidity + "%";
  if (response.data.weather[0].main == "Rain") {
    audio.play();
  }
}
featchWeather();
const button = document
  .querySelector(".searchButton")
  .addEventListener("click", function click() {
    cityName = document.querySelector(".searchInput").value;
    featchWeather();
  });
document.querySelector(".searchInput").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    cityName = document.querySelector(".searchInput").value;
    featchWeather();
  }
});

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
