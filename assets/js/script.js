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
  let forecasted = response;
  let cardsArray = [];
  for (let i = 0; i < 4; i++) {
    let forecastDate = forecasted.data[i].valid_date;
    let localMinTemp = forecasted.data[i].min_temp;
    let localMaxTemp = forecasted.data[i].max_temp;
    let forecastIcon = forecasted.data[i].weather.icon;
    let forecastIconURL = weatherImageURL + forecastIcon + ".png";
    let forecastDescription = forecasted.data[i].weather.description;

    let newCard = $("<div>").attr("class", "card-body");
    let dateP = $("<h5>")
      .attr("id", "forecastDate")
      .text("date " + forecastDate)
      .attr("class", "card-title");
    let mintempP = $("<p>")
      .attr("id", "localMinTemp")
      .attr("class", "card-text")
      .text("min temp " + localMinTemp);
    let maxtempP = $("<p>")
      .attr("id", "localMaxTemp")
      .attr("class", "card-text")
      .text("max temp " + localMaxTemp);
    let descP = $("<p>")
      .attr("id", "description")
      .attr("class", "card-text")
      .text(forecastDescription);
    let newIMG = $("<img>")
      .attr("src", forecastIconURL)
      .attr("id", "weatherIcon")
      .attr("alt", "Icon representing current weather conditions");

    newCard.append(dateP);
    newCard.append(mintempP);
    newCard.append(maxtempP);
    newCard.append(descP);
    newCard.append(newIMG);
    cardsArray.push(newCard);
  }

  let newDiv = $("<div>")
    .attr("id", "weatherDiv")
    .attr("class", "card text-white bg-info");
  newDiv.append(cardsArray);
  $("body").append(newDiv);
});
