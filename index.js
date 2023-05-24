const data = [
  {
    Delhi: { lat: 28.61, long: 77.23 },
    Mumbai: { lat: 19.0761, long: 72.8775 },
    Kolkata: { lat: 22.5675, long: 88.37 },
    Bangalore: { lat: 12.9789, long: 77.5917 },
    Chennai: { lat: 13.0825, long: 80.275 },
    Hyderabad: { lat: 17.385, long: 78.4867 },
    Pune: { lat: 18.5203, long: 73.8567 },
    Ahmedabad: { lat: 23.03, long: 72.58 },
    Surat: { lat: 21.1702, long: 72.8311 },
    Prayagraj: { lat: 25.4358, long: 81.8464 },
  },
];

//`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

// const URL=`api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${API key}`
const apiKey = "7bad00f2e703564969a401a2d81059a1";

const selectChangeHandler = ({ value }) => {
  getWeather(value)
    .then((data) => updateElement(data))
    .catch();

  getForecast(value).then(({ dataList, city }) =>
    dataList.forEach((data, index) => updateFutureForecast(data, index, city))
  );
};

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    const uniqueDates = {};
    const forecasts = data.list.reduce((acc, obj) => {
      const date = obj.dt_txt.split(" ")[0];
      if (!uniqueDates[date]) {
        uniqueDates[date] = true;
        acc.push(obj);
      }
      return acc;
    }, []);
    return { dataList: forecasts, city: city };
  } else {
    throw new Error(data.message);
  }
}

function updateElement(data) {
  console.log(data);
  if (data.weather[0].main === "Clear") {
    document
      .querySelector(".weather-card-main .weather-icon")
      .setAttribute("src", "./assets/img/sun.png");
  }
  if (data.weather[0].main === "Clouds") {
    document
      .querySelector(".weather-card-main .weather-icon")
      .setAttribute("src", "./assets/img/cloudy.png");
  }
  if (data.weather[0].main === "Haze") {
    document
      .querySelector(".weather-card-main .weather-icon")
      .setAttribute("src", "./assets/img/wind.png");
  }
  if (data.weather[0].main === "Rain") {
    document
      .querySelector(".weather-card-main .weather-icon")
      .setAttribute("src", "./assets/img/storm.png");
  }

  document.querySelector(
    ".weather-card-main .weather-stats-sec .city"
  ).innerHTML = data.name;
  document.querySelector(
    ".weather-card-main .weather-stats-sec .temprature"
  ).innerHTML = `${data.main.temp} C`;
  document.querySelector(
    ".weather-card-main .feels-like"
  ).innerHTML = `deg :${data.main.feels_like} C`;
  document.querySelector(
    ".weather-card-main .degree"
  ).innerHTML = `deg :${data.wind.deg}`;
  document.querySelector(
    ".weather-card-main .gust"
  ).innerHTML = `gust:${data.wind.gust?data.wind.gust:5.02}`;
  document.querySelector(
    ".weather-card-main .speed"
  ).innerHTML = `speed:${data.wind.speed}`;
}

function updateFutureForecast(data, index, city) {
  console.log(data);
  if (data.weather[0].main === "Clear") {
    document
      .querySelector(`#d${index} .weather-icon`)
      .setAttribute("src", "./assets/img/sun.png");
  }
  if (data.weather[0].main === "Clouds") {
    document
      .querySelector(`#d${index} .weather-icon`)
      .setAttribute("src", "./assets/img/cloudy.png");
  }
  if (data.weather[0].main === "Haze") {
    document
      .querySelector(`#d${index} .weather-icon`)
      .setAttribute("src", "./assets/img/wind.png");
  }
  if (data.weather[0].main === "Rain") {
    document
      .querySelector(`#d${index} .weather-icon`)
      .setAttribute("src", "./assets/img/storm.png");
  }
  document.querySelector(`#d${index} .weather-stats-sec .city`).innerHTML =
    city;
  document.querySelector(
    `#d${index} .weather-stats-sec .temprature`
  ).innerHTML = `${data.main.temp} C`;
  document.querySelector(
    `#d${index} .feels-like`
  ).innerHTML = `deg :${data.main.feels_like} C`;
  document.querySelector(
    `#d${index} .degree`
  ).innerHTML = `deg :${data.wind.deg}`;
  document.querySelector(
    `#d${index} .gust`
  ).innerHTML = `gust:${data.wind.gust}`;
  document.querySelector(
    `#d${index} .speed`
  ).innerHTML = `speed:${data.wind.speed}`;
}
