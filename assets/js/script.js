// weatherAPI relevant info here

// weatherAPI sample url: https://api.weatherbit.io/v2.0/current?city=Sydney&key=2583e6de5539494ca55db9ec0e80a5ee

// weather API current weather endpoints of interest:
//data[0].ob_time (last observation time YYY-MM-DD HH:MM)
//data[1].datetime (current time YYY-MM-DD:HH)
//data[0].country_code (country code)
//data[0].state_code (state code)
//data[1].temp (temp in celcius)
//data[0].rh (relative humidity)
//data[0].weather.icon (weather icon)
//data[0].weather.code (weather code?)
//data[0].weather.description (text weather description - maybe handy for alt)
//data[1].uv (uvi)
//data[1].aqi (air quality)
//data[1].precip (rain)
//data[1].sunrise (sunrise time HH:MM)
//data[1].sunset (sunset time HH:MM)
//data[1].snow (snowfall)

// NewsAPI

// https://newsapi.org/v2/top-headlines?country=au&q=covid

// articles[i].source.name (article source)
// articles[i].title (article title)
// articles[i].description (article summary)
// articles[i].url (article URL)
// articles[i].urlToImage (article image URL)
// articles[i].publishedAt (article date)
// articles[i].content (first part of article)

//Crafting a query

let weatherAPI = "https://api.weatherbit.io/v2.0/current?";
let APIkey = "&key=2583e6de5539494ca55db9ec0e80a5ee";

let query = prompt("Which city would you like to visit?");

let queryURL = weatherAPI + query + APIkey;

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
