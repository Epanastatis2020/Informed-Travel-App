// weatherAPI relevant info here

// weatherAPI sample url: https://api.weatherbit.io/v2.0/current?city=Sydney&key=2583e6de5539494ca55db9ec0e80a5ee

// weather API current weather endpoints of interest:
//data[0].country_code (country code)
//data[0].state_code (state code)
//data[0].temp (temp in celcius)
//data[0].rh (relative humidity)
//data[0].weather.icon (weather icon)
//data[0].weather.code (weather code?)
//data[0].weather.description (text weather description - maybe handy for alt)
//data[0].uv (uvi)
//data[0].aqi (air quality)
//data[0].precip (rain)
//data[0].snow (snowfall)

// NewsAPI

// https://newsapi.org/v2/top-headlines?country=au&q=covid

// articles[i].source.name (article source)
// articles[i].title (article title)
// articles[i].description (article summary)
// articles[i].url (article URL)
// articles[i].urlToImage (article image URL)
// articles[i].publishedAt (article date)
// articles[i].content (first part of article)

//Global variables
let searchCountry;

//Capturing weather information
const weatherImageURL = "https://www.weatherbit.io/static/img/icons/";
const weatherAPI = "https://api.weatherbit.io/v2.0/forecast/daily?";
const APIkey = "&key=2583e6de5539494ca55db9ec0e80a5ee";
let input = prompt("Which city would you like to visit?");
let query = "city=" + input;
let forecastRange = "&days=4";
const queryURL = weatherAPI + query + forecastRange + APIkey;

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  let forecastDate = response.data[0].valid_date;
  let localMinTemp = response.data[0].min_temp;
  let localMaxTemp = response.data[0].max_temp;
  let forecastIcon = response.data[0].weather.icon;
  let forecastIconURL = weatherImageURL + forecastIcon + ".png";
  let forecastDescription = response.data[0].weather.description;

  let newDiv = $("<div>").attr("id", "weatherDiv");
  let dateP = $("<p>")
    .attr("id", "forecastDate")
    .text("date " + forecastDate);
  let mintempP = $("<p>")
    .attr("id", "localMinTemp")
    .text("min temp " + localMinTemp);
  let maxtempP = $("<p>")
    .attr("id", "localMaxTemp")
    .text("max temp " + localMaxTemp);
  let descP = $("<p>").attr("id", "description").text(forecastDescription);
  let newIMG = $("<img>")
    .attr("src", forecastIconURL)
    .attr("id", "weatherIcon");

  newDiv.append(dateP);
  newDiv.append(mintempP);
  newDiv.append(maxtempP);
  newDiv.append(descP);
  newDiv.append(newIMG);
  $("body").append(newDiv);
});
