// Calling the weather API

$(document).ready(function () {
  $("#userInputForm").submit(function (event) {
    event.preventDefault();
    getWeather();
  });
});

function getWeather() {
  //Preparing the weather div container

  $("#weathercontainer").empty();

  //Capturing weather information

  const weatherImageURL = "https://www.weatherbit.io/static/img/icons/";
  const weatherAPI = "https://api.weatherbit.io/v2.0/forecast/daily?";
  const APIkey = "&key=2583e6de5539494ca55db9ec0e80a5ee";
  let forecastRange = "&days=4";
  let input = $("#userInput").val();
  let query = "city=" + input;
  const queryWeatherURL = weatherAPI + query + forecastRange + APIkey;

  console.log(`Search weather: ${input}`);

  $.ajax({
    url: queryWeatherURL,
    method: "GET",
  }).then(function (response) {
    let forecasted = response;

    // Looping through the array and creating elements for each instance (i.e. day)

    let cardsArray = [];
    for (let i = 0; i < 4; i++) {
      let forecastDate = forecasted.data[i].valid_date;
      let localMinTemp = forecasted.data[i].min_temp;
      let localMaxTemp = forecasted.data[i].max_temp;
      let forecastIcon = forecasted.data[i].weather.icon;
      let forecastIconURL = weatherImageURL + forecastIcon + ".png";
      let forecastDescription = forecasted.data[i].weather.description;

      let newCard = $("<div>").attr("class", "col-md-3");
      let dateP = $("<h5>")
        .attr("id", "forecastDate")
        .text(forecastDate)
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

    let weatherRow = $("<div>").attr("class", "row");
    weatherRow.append(cardsArray);
    $("#weathercontainer").append(weatherRow);

    let catchCountry = forecasted.country_code; // Moved this out of the for loop (Tim)
    getNews(catchCountry);
  });
}

// Ajax call to GNews API. Response will be an object with an array of articles.
function getNews(catchCountry) {
  // NewsAPI
  let newsAPIKey = "0e966fb836610aa7a1a213a0b9d61c6b";
  let newsQueryURL = `https://gnews.io/api/v4/top-headlines?country=${catchCountry}&lang=en&max=5&token=${newsAPIKey}`;

  console.log(`Search news: ${catchCountry}`);

  $.ajax({
    type: "GET",
    url: newsQueryURL,
    success: function (response) {
      // Get the array of returned articles from the response.
      let arrArticles = response.articles;

      // Remove any existing articles from the page.
      $(".news-item").remove();

      // Loop through the array and call renderArticle to display the each one.
      arrArticles.forEach((article) => {
        renderArticle(article);
      });
    },
  });
}


function renderArticle(objArticle) {

  // Take the object that's been passed to the function and create some string variables.
  let strTitle = objArticle.title;
  let strDescription = objArticle.description;
  let strURL = objArticle.url;
  let strImageURL = objArticle.image;
  let strSource = objArticle.source.name;

  // Build a new list item to render.
  let newLI = $("<li>").addClass("media news-item");

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
function saveFavourite(strDestination) {

  console.log(`Saving ${strDestination}`);
  // Call getFavourites to creaate the favourites array. This will either be empty or contain items already in storage.
  let arrFavourites = getFavourites();

  // Check if the new destination is already been saved. If not, save it.
  if (!arrFavourites.includes(strDestination)) {

    arrFavourites.push(strDestination);

  }

  // Save the array back to localstorage.
  localStorage.setItem("travelFavourites", JSON.stringify(arrFavourites));

}


// Get favourites from localstorage or create an empty array. Return the array.
function getFavourites() {

  // Try and get stored items.
  let arrDestinations = localStorage.getItem("travelFavourites");

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


// Function to populate the favourites modal and display it.
function showFavourites() {

  // Populate the history list from localstorage.
  let arrFavourites = getFavourites();

  arrFavourites.forEach(function (favourite) {

    // Add a new li to the list.
    // First create the new li, add classes and text.
    let newLI = $("<li>")
    newLI.addClass("list-group-item d-flex align-items-left fav-item");
    newLI.text(favourite);

    // Add the search and remove buttons to the li.
    newLI.append(`<button class="btn btn-sm btn-primary ml-auto fav-search" disabled>Search</button>`);
    newLI.append(`<button class="btn btn-sm btn-danger ml-2 fav-remove">Remove</button>`);

    // Append the new favourite entry to the list.
    $("#favList").append(newLI);

  })

  // If there are entries to show, also show the remove all button.
  if (arrFavourites.length > 0) {
    $("#btnRemoveAll").show();
  }
  else {
    $("#btnRemoveAll").hide();
  }

  // Show the modal.
  $("#favModal").modal("show");

}


function removeFavourite(favourite) {

  // Try and get items from storage. An array will be returned but it will be empty if there was nothing
  // in storage.
  let arrFavs = getFavourites();

  // Filter the array to remove the city.
  arrFavs = arrFavs.filter(item => item !== favourite)

  // If there's nothing left in the array, remove the entry from localstorage.
  if (arrFavs.length === 0) {

    // Remove entry from localstorage.
    localStorage.removeItem("travelFavourites");

  }
  else {

    // Save back to localstorage.
    localStorage.setItem("travelFavourites", JSON.stringify(arrFavs));

  }

}

// Listener for the add to favourites button.
$("#btnAddFavourite").on("click", function (event) {

  event.preventDefault();

  // Get user input from the search box.
  let strInput = $("#userInput").val();

  // Call saveFavourite to save to localstorage.
  saveFavourite(strInput);

});



// Listener for the favourites button.
$("#btnFavourites").on("click", function (event) {

  event.preventDefault();

  // Call showFavourites to render the modal.
  showFavourites();

});


// Listener for the search and remove buttons on the history screen.
$("#favList").on("click", "button", function (event) {


  event.preventDefault();


  // Get the name of the selected item
  let strFavName = $(this).parent().contents()[0].textContent;


  // Call getWeatherData if the search button was clicked or remove the item
  // if the remove button was clicked.
  if ($(this).hasClass("fav-search")) {

    // hideHistory();
    // getWeatherData(strFavName);

  }
  else if ($(this).hasClass("fav-remove")) {

    // Call removeFavourite to remove the item from storage.
    removeFavourite(strFavName);

    // Remove the item from the list.
    $(this).parent().remove();

    // If it was the last one hide the remove all button.
    if ($(".fav-item").length === 0) {

      $("#btnRemoveAll").hide();

    }

  }

});


// Listener for the remove all button on the history screen.
$("#btnRemoveAll").on("click", function (event) {

  event.preventDefault();

  // Remove entries from localstorage.
  localStorage.removeItem("travelFavourites");


  // Remove items from the favourites screen list.
  $(".fav-item").remove();

  // Hide the remove all button and disable the history button.
  $("#btnRemoveAll").hide();

});





// saveFavourite("paris");