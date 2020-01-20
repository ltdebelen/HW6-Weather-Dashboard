$(document).ready(function() {
  // Variables
  let api_key = "8045ec9f12de714284aa8926a3a735d1";
  let baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;

  const city = "Lenexa";
  const unit = "imperial";
  const newURL = baseURL + "&q=" + city + "&units=" + unit;

  console.log(newURL);

  $.ajax({
    url: newURL,
    method: "GET"
  }).then(function(response) {
    console.log("======================");
    // Temperature in Fahrenheit
    console.log("Temp in Fahrenheit: " + response.main.temp + " F");

    // Humidity Percentage
    console.log("Humidity: " + response.main.humidity + "%");

    // Wind Speed: MPH
    console.log("Wind Speed: " + response.wind.speed + " MPH");

    // UV
    const lon = response.coord.lon;
    const lat = response.coord.lat;
    console.log("Lon: " + lon);
    console.log("Lat: " + lat);

    // getUVIndex(lon, lat);

    // 5 day forecast
    const id = response.id;
    getWeekForecast(id);
  });

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
