$(document).ready(function() {
  $("#search-button").on("click", function(e) {
    e.preventDefault();
    const city = $("#city").val();
    getCityWeather(city);
  });

  function getCityWeather(city) {
    let api_key = "8045ec9f12de714284aa8926a3a735d1";
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;

    city = city;
    const unit = "imperial";
    const newURL = baseURL + "&q=" + city + "&units=" + unit;

    $.ajax({
      url: newURL,
      method: "GET"
    }).then(function(response) {
      // City Name
      $("#city-name").text(response.name);

      // Today's Date
      $("#date-today").text(`(${moment().format("l")})`);

      // Weather Icon
      $("#weather-icon").attr(
        "src",
        `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`
      );

      // Temperature in Fahrenheit
      $("#temperature").text(response.main.temp + " F");

      // Humidity Percentage
      $("#humidity").text(response.main.humidity + " %");

      // Wind Speed: MPH
      $("#wind-speed").text(response.wind.speed + " MPH");

      // Get UV Index
      const lon = response.coord.lon;
      const lat = response.coord.lat;
      getUVIndex(lon, lat);

      // 5 day forecast
      const id = response.id;
      getWeekForecast(id);
    });
  }

  // Get UV Index
  function getUVIndex(lon, lat) {
    let api_key = "8045ec9f12de714284aa8926a3a735d1";
    let baseURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${api_key}`;

    const newURL = baseURL + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
      url: newURL,
      method: "GET"
    }).then(function(response) {
      console.log("======================UV INDEX");
      // UV
      console.log("UV Index: " + response.value);
    });
  }

  // Get Five Day forecast
  function getWeekForecast(id) {
    console.log("============= WEATHER FORECAST");
    console.log("ID: " + id + " For weather forcast");

    let api_key = "8045ec9f12de714284aa8926a3a735d1";
    let baseURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}`;

    const newURL = baseURL + "&id=" + id;
    console.log(newURL);

    $.ajax({
      url: newURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.list);

      //loop through array
      for (let i = 5; i < response.list.length; i += 8) {
        console.log(response.list[i]);
      }
    });
  }
});
