
const api_key = "c7c4874fda814bf6a15183300250507";
const form = document.querySelector('form');
const city_name=document.getElementById('city-name')
const timeHolder = document.getElementById("time")
const weather_degree = document.getElementById("weather-degree")
const weather_text = document.getElementById("weather-text")
const ressenti_degree = document.getElementById("ressenti-degree")
const humidité = document.getElementById("humidité")
const wind = document.getElementById("wind")
const iconImage = document.getElementById("icon")
const body = document.body;
const main = document.querySelector("main");


function localTimeHandler(time){
    let timeFormatted = time.replace(/-/g, " ");
    return timeFormatted
}

function setWeatherBackground(weatherText) {


  const rainImage = "./images/rain.jpg";
  const windImage = "./images/windy.jpg";
  const snowImage = "./images/snow.jpg";
  const fogImage = "./images/fog.jpg";
  const sunImage = "./images/sun.jpg";
  const cloudImage='./images/cloud.jpg'

  let backgroundImage = "";

  if (weatherText.toLowerCase().includes("rain")) {
    backgroundImage = rainImage;
  } else if (weatherText.toLowerCase().includes("wind")) {
    backgroundImage = windImage;
  } else if (weatherText.toLowerCase().includes("snow") ||
    weatherText.toLowerCase().includes("blizzard")) {
    backgroundImage = snowImage;
  } else if (weatherText.toLowerCase().includes("fog")||
    weatherText.toLowerCase().includes("mist") ) {
    backgroundImage = fogImage;
  } else if (
    weatherText.toLowerCase().includes("sun")
  ) {
    backgroundImage = sunImage;
  } else if(weatherText.toLowerCase().includes('cloudy') ||
    weatherText.toLowerCase().includes("overcast")){
    backgroundImage=cloudImage;
  }

  if (backgroundImage) {
    body.style.backgroundImage = `url(${backgroundImage})`;
    main.style.backgroundImage = `url(${backgroundImage})`;
  } else {
    body.style.backgroundImage = "";
    blurBox.style.backgroundImage = "";
  }
}

async function search(query) {
  const loading = document.getElementById("loading");
 loading.style.display = "flex"; // 


  const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${query}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found or API error");

    const data = await response.json();

    city_name.innerText = data.location.name;
    timeHolder.innerText = localTimeHandler(data.location.localtime.split(' ')[0]);
    weather_degree.innerText = data.current.temp_c;
    weather_text.innerText = data.current.condition.text;
    iconImage.style.display = 'block';
    iconImage.src = "https:" + data.current.condition.icon;
    ressenti_degree.innerText = data.current.feelslike_c;
    humidité.innerText = data.current.humidity;
    wind.innerText = data.current.wind_kph;
    setWeatherBackground(data.current.condition.text);
  } catch (error) {
    city_name.style.cssText = `
      font-size:25px;
      text-align:center;
      color:red;`;
    city_name.innerText = "You misspelled the name of your city, try again...";
    console.error(error.message);
  } finally {
    loading.style.display = "none"; 
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = document.getElementById('city').value; 
  search(query);
});