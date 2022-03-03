"use strict";
let cityName = "آمل";
const card_list = document.querySelector(".card--list");
const audio = new Audio("./sound/rain.mp3");

function featchWeather() {
  const apiKey = "c0ac4587278e2f95fad212e0ef59e540";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fa`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function displayWeather(response) {
  // console.log(response.data);
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const main = response.data.weather[0].main;
  const humidity = response.data.main.humidity;
  const temp = response.data.main.temp;
  const feels = response.data.main.feels_like;
  // const icon = response.data.weather[0].icon;
  document.querySelector(
    ".icon"
  ).src = `./img/weather_des/${description}.gif`;
  document.querySelector(".location span").innerHTML = cityName;
  if (cityName.length > 8) {
    document.querySelector(".location span").style.fontSize = "1.5rem";
  } else {
    document.querySelector(".location span").style.fontSize = "200%";
  }
  document.querySelector(".description").innerHTML =
    " وضعیت هوا : " + description;
  document.querySelector(".windspeed").innerHTML =
    "سرعت باد : " + wind + " کیلومتر / ساعت";
  document.querySelector(".temp").innerHTML = temp + "°";
  document.querySelector(".background_humidity").style.height = humidity + "%";
  document.querySelector(".background_humidity span").innerHTML =
    humidity + "%";

  if (temp >= 25 && main === "Clear") {
    document.querySelector(".icon").src = "./img/weather_des/آسمان صاف2.gif";
  }
  if (wind >= 5) {
    document.querySelector(".icon").src = "./img/weather_des/wind.gif";
  }

  var persent = ((feels + 100) * 100) / 157;
  var persent = Math.round(persent);
  document.querySelector(".background").style.height = persent + "%";
  if (main == "Rain") {
    audio.play();
  } else {
    audio.pause();
  }

  let images = [];
  let index = 0;

  for (let i = 0; i <= 5; i++) {
    images.push(`./img/${main}/${i}.jpg`);
  }

  index = Math.floor(Math.random() * images.length);

  card_list.style.backgroundImage = `url(${images[index]})`;
  card_list.style.backgroundSize = "cover";
  card_list.style.backgroundPosition = "center";

  document.querySelector(".oghatCity").innerHTML = `اوقات شرعی  ${cityName}`;
}

function fetchSeason() {
  fetch("https://api.keybit.ir/time/")
    .then((response) => response.json())
    .then((data) => displaySeason(data));
}
function displaySeason(data) {
  const season = data.season.name;
  const year_left = data.date.year.agone.percent.en;
  document.querySelector(".taPaianeSal--seconde div").style.width =
    year_left + "%";
  // console.log(season, data, year_left);
  document.querySelector(
    ".container"
  ).style.backgroundImage = `url(./img/season/${season}.jpg)`;
  document.querySelector(".container").style.backgroundSize = "cover";
}
fetchSeason();

/* displaying calendar
function displayCal(data) {
  const year = data.date.year.number.fa;
  const kabiseh = data.date.year.leapyear;
  const monasebatHS = data.date.day.events.local.text;
  let monasebatHG = data.date.day.events.holy;
  const animal = data.date.year.animal;
  const month = data.date.month.name;
  const date = data.date.full.official.iso.fa;

  document.querySelector("p.today1").innerHTML = date;
  document.querySelector("h1.month").innerHTML = month;
  document.querySelector(".monasebat img").src = `./img/${animal}.jpg`;
  console.log(data);

  if (monasebatHG !== null) {
    monasebatHG = data.date.day.events.holy.text;
  }

 
  document.querySelector(".monasebat div p").innerHTML =
    `${monasebatHS} و ${monasebatHG}`;
  if (monasebatHS === null) {
    document.querySelector(".monasebat div p").innerHTML = monasebatHG + " ";
  } else if (monasebatHG === null) {
    document.querySelector(".monasebat div p").innerHTML = monasebatHS + " ";
  } else if (monasebatHG === null && monasebatHS === null) {
    document.querySelector(".monasebat div p").innerHTML =
      "امروز رویدادی ندارد";
  }


  if (monasebatHS === null) {
    document.querySelector(".monasebat div p").innerHTML = monasebatHG;
  } else if (monasebatHG === null) {
    document.querySelector(".monasebat div p").innerHTML = monasebatHS;
  } else if (monasebatHG === null && monasebatHS === null) {
    document.querySelector(".monasebat div p").innerHTML =
      "امروز رویدادی ندارد";
  } else if (monasebatHG !== null && monasebatHS !== null) {
    document.querySelector(".monasebat div p").innerHTML =
      monasebatHS + " و " + monasebatHG;
  }

  document.querySelector(
    ".monasebat div small"
  ).innerHTML = `سال ${year} ${kabiseh} است`;

  for (let i = 1; i <= 29; i++) {
    let day = document.createElement("div");
    day.innerHTML = i;
    document.querySelector(".days").appendChild(day);

    if (i == 15) {
      day.classList.add("tree");
    }

    if (i == 25) {
      day.classList.add("fire");
    }

    if (i == data.date.day.number.en) {
      day.classList.add("today");
    }
  }
}

fetchcalendar();
*/

// SCRAPING
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://www.time.ir/", true);
xhr.responseType = "document";

xhr.onload = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = xhr.responseXML.querySelectorAll(".dayList > div ");
    var today = xhr.responseXML.querySelector(
      ".dayList > div.today div.jalali"
    );
    var year = xhr.responseXML.querySelectorAll(".selectYear");
    var miladidate = xhr.responseXML.querySelector(
      "#ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate00cphTop_3734_lblGregorian"
    );
    var qamaridate = xhr.responseXML.querySelector(
      "#ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate00cphTop_3734_lblHijri"
    );
    var month = xhr.responseXML.querySelectorAll(".selectMonth");
    var event = xhr.responseXML.querySelectorAll(".list-unstyled > li");
    var tahvilesal = xhr.responseXML.querySelectorAll(".content");
    var borgfalaki = xhr.responseXML.querySelectorAll(".astrologicalSign");

    document.querySelector(".salTahvil h3").innerHTML =
      " 🎉" + tahvilesal[0].innerText + "🎉";

    document.querySelector(".details-cal").innerHTML =
      month[0].innerHTML + " " + year[0].innerHTML;

    // console.log(response, borgfalaki[0].innerText);
    // console.log(tahvilesal[0].innerText);

    document.querySelector(".date").innerHTML =
      year[0].innerText +
      "<br/>" +
      today.innerText +
      "<br/>" +
      month[0].innerText;

    document.querySelector("#miladi").innerHTML = miladidate.innerText;
    document.querySelector("#qamari").innerHTML = qamaridate.innerText;

    // console.log(miladidate.innerText);

    for (let i = 0; i < event.length; i++) {
      let li = document.createElement("li");
      document.querySelector(".monasebat ul").appendChild(li);
      li.innerHTML = event[i].innerText;
    }

    for (let i = 0; i < 35; i++) {
      let day = document.createElement("div");
      day.classList.add("day");
      document.querySelector(".days").append(day);

      day.innerHTML = response[i].outerHTML;

      if (month[0].innerText == "اسفند") {
        if (day.innerText === "۲۴") {
          day.style.background = "url(./img/fire.gif)";
          day.style.backgroundSize = "cover";
        }

        if (day.innerText === "۱۵") {
          day.style.background = "url(./img/tree.gif)";
          day.style.backgroundSize = "cover";
        }
      }
      if (month[0].innerText == "فروردین") {
        if (day.innerText === "۱۳") {
          day.style.background = "url(./img/tree.gif)";
          day.style.backgroundSize = "cover";
        }
        for (i = 1; i <= 4; i++) {
          if (day.innerText === i) {
            day.style.background = "green";
          }
        }
      }

      if (day.innerHTML === "") {
        day.classList.add("remove");
      }
    }
  }
};
xhr.onerror = function () {
  console.error(xhr.status, xhr.statusText);
};

xhr.send();

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
  // console.log(data);
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

const cardCal = document.querySelector(".cardCal");
const cardTemp = document.querySelector(".cardTemp");
const cardHum = document.querySelector(".cardHum");

function showHum() {
  cardCal.style.display = "none";
  cardTemp.style.display = "none";
  cardHum.style.display = "flex";
}

function showTemp() {
  cardCal.style.display = "none";
  cardTemp.style.display = "flex";
  cardHum.style.display = "none";
}
function showCal() {
  cardCal.style.display = "flex";
  cardTemp.style.display = "none";
  cardHum.style.display = "none";
}

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
