// NewsAPI

let strNewsAPIKey = "0e966fb836610aa7a1a213a0b9d61c6b";
let strCountryCode = "au";
let newsQueryURL = `https://gnews.io/api/v4/top-headlines?country=${countryCode}&max=5&token=${newsAPIKey}`;

//Global variables
let searchCountry;

//Capturing weather information
const weatherImageURL = "https://www.weatherbit.io/static/img/icons/";
const weatherAPI = "https://api.weatherbit.io/v2.0/forecast/daily?";
const APIkey = "&key=2583e6de5539494ca55db9ec0e80a5ee";
let input = prompt("Which city would you like to visit?");
let query = "city=" + input;
let forecastRange = "&days=4";
const queryWeatherURL = weatherAPI + query + forecastRange + APIkey;

$.ajax({
  url: queryWeatherURL,
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

// Ajax call to GNews API. Response will be an object with an array of articles.
$.ajax({
  type: "GET",
  url: newsQueryURL,
  success: function (response) {
    // Get the array of returned articles from the response.
    let arrArticles = response.articles;

    // Loop through the array and call renderArticle to display the each one.
    arrArticles.forEach((article) => {
      console.log(article);
      renderArticle(article);
    });
  },
});

function renderArticle(objArticle) {
  // Take the object that's been passed to the function and create some string variables.
  let strTitle = objArticle.title;
  let strDescription = objArticle.description;
  let strURL = objArticle.url;
  let strImageURL = objArticle.image;
  let strSource = objArticle.source.name;

  console.log(strTitle + strDescription + strURL + strImageURL + strSource);

  // Build a new list item to render.
  let newLI = $("<li>").addClass("media");

  // Create the image element.
  let articleImage = $("<img>")
    .addClass("mr-3 article-image")
    .attr("src", strImageURL);

  // Create the article div with header/link
  let articleDiv = $("<div>").addClass("media-body");
  let articleHeader = $("<h5>").addClass("mt-0 mb-1");
  let articleLink = $("<a>").attr("href", strURL).text(strTitle);
  articleHeader.append(articleLink); // Append the <a> tag to the header

  // Append article header and description to the div.
  articleDiv.append(articleHeader);
  articleDiv.append(strDescription);

  // Append the image and article div to the new li then append to the list.
  newLI.append(articleImage);
  newLI.append(articleDiv);
  $("ul.list-unstyled").append(newLI);
}


// Saves the current search to favourites in localstorage.
function saveToFavourites(strDestination) {

  // Call getFavourites to creaate the favourites array. This will either be empty or contain items already in storage.
  let arrFavourites = getFavourites();

  // Check if the new destination is already been saved. If not, save it.
  if (!arrFavourites.includes(strDestination)) {

    arrFavourites.push(strDestination);

  }

  // Save the array back to localstorage.
  localStorage.setItem("infTravelFavourites", JSON.stringify(arrFavourites));

}


// Get favourites from localstorage or create an empty array. Return the array.
function getFavourites() {

  // Try and get stored items.
  let arrDestinations = localStorage.getItem("infTravelFavourites");

  // If there was nothing in loclstorage, create an empty array. Otherwise parse and assign to the array.
  if (arrDestinations === null) {

    arrDestinations = [];

  }
  else {

    arrDestinations = JSON.parse(arrDestinations);
  }

  // Return the array to the calling function.
  return arrDestinations;

}

