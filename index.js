const container = document.querySelector(".container");
const weatherCondition = document.querySelector(".weather");
const cryptoData = document.querySelector(".crypto");
const currentTime = document.getElementById("currentTime");
const source = document.getElementById("source");
const author = document.getElementById("author");
const doge = document.getElementById("dogecoin");
const btc = document.getElementById("bitcoin");
const eth = document.getElementById("ethereum");
const body = document.body;

const endpoint =
  "https://api.unsplash.com/photos/random/?query=travel&orientation=landscape&client_id=hjRE5t2RVXBqp561CfadH4aoW5oMSuEhDXsDxFJJ_nU";

function getPhoto() {
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong...");
        }
        return res.json();
      })
      .then((data) => {
        body.style.backgroundImage = `url(${data.urls.full})`;
        author.innerHTML = `<a href=${data.user.links.html} target="_blank">${data.user.name}</a>`;
        source.innerHTML = `<a href="https://unsplash.com/" target="_blank">Unsplash</a>`;
      })
      .catch((err) => {
        console.error(err);
        body.style.backgroundImage = `url(https://images.unsplash.com/photo-1478860409698-8707f313ee8b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyOTE4NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDI0ODk0Nzg&ixlib=rb-1.2.1&q=85)`;
        author.innerHTML = `<a href="https://unsplash.com/@anniespratt" target="_blank">Annie Spratt</a>`;
        source.innerHTML = `<a href="https://unsplash.com/" target="_blank">Unsplash</a>`;
      });
}
getPhoto()
setInterval(getPhoto, 3600000)

async function getCoins() {
  let dogecoin = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
  let dogecoinData = await dogecoin.json();
  console.log(dogecoinData);

  let bitcoin = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
  let bitcoinData = await bitcoin.json();
  console.log(bitcoinData);

  let ethereum = await fetch("https://api.coingecko.com/api/v3/coins/ethereum");
  let ethereumData = await ethereum.json();

  doge.innerHTML = `
    <p>${dogecoinData.name}: <img src=${dogecoinData.image.thumb} alt=${dogecoinData.id}></p>
    <p>Current Price: <span>$${dogecoinData.market_data.current_price.usd}</span></p>
    `;

  btc.innerHTML = `
    <p>${bitcoinData.name}: <img src=${bitcoinData.image.thumb} alt=${bitcoinData.id}></p>
    <p>Current Price: <span>$${bitcoinData.market_data.current_price.usd}</span></p>
    `;

  eth.innerHTML = `
    <p>${ethereumData.name}: <img src=${ethereumData.image.thumb} alt=${ethereumData.id}></p>
    <p>Current Price: <span>$${ethereumData.market_data.current_price.usd}</span></p>
    `;
}

getCoins();

navigator.geolocation.getCurrentPosition((pos) => {
  let currentPosition = pos.coords;
  let lati = currentPosition.latitude;
  let long = currentPosition.longitude;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=077a3659299af569d1e982ecc6505cd3`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data unavailable");
      }
      return res.json();
    })
    .then((weather) => {
      weatherCondition.innerHTML = `<p>${weather.main.temp}⁰ <img src='http://openweathermap.org/img/w/${weather.weather[0].icon}.png' alt="weather icon"></p>
                           <p>${weather.weather[0].description}</p>
                           <h4>${weather.name}, ${weather.sys.country}</h4>
                            `;
    })
    .catch((err) => {
      console.error(err);
    });
});

function getCurrentTime() {
  let today = new Date();
  let now = today.toLocaleTimeString("en-us", { timeStyle: "short" });
  currentTime.textContent = `${now}`;
}

setInterval(getCurrentTime, 1000);

