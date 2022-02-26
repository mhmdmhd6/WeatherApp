"use strict";
let cityName = "بابل";
const body = document.querySelector("body");
const audio = new Audio("./sound/rain.mp3");

function featchWeather() {
  const apiKey = "c0ac4587278e2f95fad212e0ef59e540";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fa`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}
function displayWeather(response) {
  console.log(response.data);
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const main = response.data.weather[0].main;
  const humidity = response.data.main.humidity;
  const temp = response.data.main.temp;
  const feels = response.data.main.feels_like;
  const icon = response.data.weather[0].icon;
  document.querySelector(
    ".icon"
  ).src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  document.querySelector(".location span").innerHTML = cityName;
  if (cityName.length > 8) {
    document.querySelector(".location span").style.fontSize = "1.5rem";
  } else {
    document.querySelector(".location span").style.fontSize = "200%";
  }
  document.querySelector(".description").innerHTML = description;
  document.querySelector(".windSpeed").innerHTML =
    "سرعت باد : " + wind + " کیلومتر / ساعت";
  document.querySelector(".temp").innerHTML = temp + "°";
  document.querySelector(".background_humidity").style.height = humidity + "%";
  document.querySelector(".background_humidity span").innerHTML =
    humidity + "%";

  var persent = ((feels + 100) * 100) / 157;
  var persent = Math.round(persent);
  document.querySelector(".background").style.height = persent + "%";
  if (main == "Rain") {
    audio.play();
  }
}
/*if (humidity >= 50) {
    document.querySelector(".recommend").innerHTML = "امکان داره بارون بیاد 🌧";
  } else {
    document.querySelector(".recommend").innerHTML = "میتونی بدون چتر بیرون بری 🌞";
  }
  if (wind >= 7) {
    document.querySelector(".recommend").innerHTML = "مواظب باش باد نبرتت ";
  } else {
    document.querySelector(".recommend").innerHTML =
      "هوا عالیه!!";
  }
  console.log(response.data);
}
*/

function fetchcalendar() {
  fetch("https://api.keybit.ir/time/")
    .then((response) => response.json())
    .then((data) => displayCal(data));
}

function displayCal(data) {
  const year = data.date.year.number.fa;
  const kabiseh = data.date.year.leapyear;
  const monasebat = data.date.day.events.local;
  const animal = data.date.year.animal;
  const month = data.date.month.name;
  const date = data.date.full.official.iso.fa;
  document.querySelector("p.today1").innerHTML = date;
  document.querySelector("h1.month").innerHTML = month;
  document.querySelector(".monasebat img").src = `./img/${animal}.jpg`;
  console.log(data);

  if (monasebat === null) {
    document.querySelector(".monasebat p").innerHTML = "امروز رویدادی ندارد";
  } else {
    document.querySelector(".monasebat p").innerHTML = monasebat;
  }
  document.querySelector(".monasebat small").innerHTML = `سال ${year} ${kabiseh} است`; 

  for (let i = 1; i <= 29; i++) {
    let day = document.createElement("div");
    day.innerHTML = i;
    document.querySelector(".days").appendChild(day);

    if (i == data.date.day.number.en) {
      day.classList.add("today");
    }
  }
}

fetchcalendar();

const button = document
  .querySelector(".searchButton")
  .addEventListener("click", function click() {
    cityName = document.querySelector(".searchInput").value;
    featchWeather();
    fetch_oghat();
  });
document.querySelector(".searchInput").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    cityName = document.querySelector(".searchInput").value;
    featchWeather();
    fetch_oghat();
  }
});

featchWeather();

function fetch_oghat() {
  fetch(
    `https://api.keybit.ir/owghat/?city=${
      document.querySelector(".searchInput").value
    }`
  )
    .then((response) => response.json())
    .then((data) => display_oghat(data));
}

function display_oghat(data) {
  console.log(data);
  document.querySelector("div.tolu").innerHTML =
    data.result.tolu_aftab + "<br/>" + "طلوع آفتاب";
  document.querySelector("div.sobh").innerHTML =
    data.result.azan_sobh + "<br/>" + "اذان صبح";
  document.querySelector("div.zohr").innerHTML =
    data.result.azan_zohr + "<br/>" + "اذان ظهر";
  document.querySelector("div.maghreb").innerHTML =
    data.result.azan_maghreb + "<br/>" + "اذان مغرب";
  document.querySelector("div.ghorub").innerHTML =
    data.result.ghorub_aftab + "<br/>" + "غروب آفتاب";
  document.querySelector("div.nimeshab").innerHTML =
    data.result.nimeshab + "<br/>" + "نیمه شب";
}

fetch_oghat();
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
