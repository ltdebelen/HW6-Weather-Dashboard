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
      const uv = response.value;

      if (uv <= 2.0) {
        // Favorable: 2 OR LESS
        $("#uv-index").text(uv);
        $("#uv-index").addClass("badge badge-success");
      } else if (uv > 2.0 && uv <= 5.0) {
        // Medium: 2.1 TO 5
        $("#uv-index").text(uv);
        $("#uv-index").addClass("badge badge-warning");
      } else if (uv > 5.0 && uv <= 10.0) {
        // HIGH: 5.1 to 10
        $("#uv-index").text(uv);
        $("#uv-index").addClass("badge badge-danger");
      }
    });
  }

  // Get Five Day forecast
  function getWeekForecast(id) {
    let api_key = "8045ec9f12de714284aa8926a3a735d1";
    let baseURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}`;

    const newURL = baseURL + "&id=" + id;

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
