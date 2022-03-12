"use strict";
let cityName = "آمل";
const card_list = document.querySelector(".card--list");
const audioRain = new Audio("./sound/rain.mp3");

function featchWeather() {
  const apiKey = "c0ac4587278e2f95fad212e0ef59e540";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fa`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function displayWeather(response) {
  const description = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const main = response.data.weather[0].main;
  const humidity = response.data.main.humidity;
  const temp = response.data.main.temp;
  const feels = response.data.main.feels_like;
  document.querySelector(".icon").src = `./img/weather_des/${description}.gif`;
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
  document.querySelector(".temp").innerHTML = temp + " C" + "°";
  document.querySelector(".background_humidity").style.height = humidity + "%";
  document.querySelector(".background_humidity span").innerHTML =
    humidity + "%";

  if (temp >= 25 && main === "Clear") {
    document.querySelector(".icon").src = "./img/weather_des/آسمان صاف2.gif";
  }
  if (wind >= 14) {
    document.querySelector(".icon").src = "./img/weather_des/wind.gif";
  }

  var persent = ((feels + 90) * 100) / 147;
  var persent = Math.round(persent);
  document.querySelector(".background").style.height = persent + "%";
  if (main == "Rain") {
    audioRain.play();
  } else {
    audioRain.pause();
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
  document.querySelector(
    ".container"
  ).style.backgroundImage = `url(./img/season/${season}.jpg)`;
  document.querySelector(".container").style.backgroundSize = "cover";
}
fetchSeason();

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
    var month = xhr.responseXML.querySelectorAll(".selectMonth");
    var miladidate = xhr.responseXML.querySelector(
      "#ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate11cphTop_3917_lblGregorian"
    );
    var qamaridate = xhr.responseXML.querySelector(
      "#ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate11cphTop_3917_lblHijri"
    );
    var event = xhr.responseXML.querySelectorAll(".list-unstyled > li");
    var tahvilesal = xhr.responseXML.querySelectorAll(".content");

    const mediaQuery = window.matchMedia("(max-width: 950px)");

    if (mediaQuery.matches) {
      miladidate = xhr.responseXML.querySelector(
        "#ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate01cphTop_3917_lblGregorian"
      );
      qamaridate = xhr.responseXML.querySelector(
        "#ctl00_cphTop_Sampa_Web_View_TimeUI_ShowDate01cphTop_3917_lblHijri"
      );
    }

    document.querySelector(".salTahvil h3").innerHTML =
      " 🎉" + tahvilesal[0].innerText + "🎉";

    document.querySelector(".details-cal").innerHTML =
      month[0].innerHTML + " " + year[0].innerHTML;

    console.log(response);
    console.log(tahvilesal[0].innerText);

    document.querySelector(".date").innerHTML =
      year[0].innerText +
      "<br/>" +
      today.innerText +
      "<br/>" +
      month[0].innerText;

    document.querySelector("#miladi").innerHTML = miladidate.textContent;
    document.querySelector("#qamari").innerHTML = qamaridate.textContent;

    console.log(miladidate, qamaridate);

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
