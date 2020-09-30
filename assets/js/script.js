// Calling the weather API

$(document).ready(function () {

  showWelcomeScreen();

  $("#userInputForm").submit(function (event) {
    event.preventDefault();
    let input = $("#userInput").val();
    getWeather(input);
  });

});

// This pulls in the weather data as a function of the user input

function getWeather(searchTerm) {
  // Preparing the weather div container

  $("#weathercontainer").empty();

  // Creating variables necessary for API call (mostly constructing the queryURL)

  const weatherImageURL = "https://www.weatherbit.io/static/img/icons/";
  const weatherAPI = "https://api.weatherbit.io/v2.0/forecast/daily?";
  const APIkey = "&key=2583e6de5539494ca55db9ec0e80a5ee";
  let forecastRange = "&days=4";
  let query = "city=" + searchTerm;
  const queryWeatherURL = weatherAPI + query + forecastRange + APIkey;

  // Ajax call to Weatherbit.io API

  $.ajax({
    url: queryWeatherURL,
    method: "GET",
    // Manage 404 to show error message
    statusCode: {
      204: function () {
        $("#404modalText").text("Cannot find a match for that entry");
        $("#404modal").modal("show");
      },
    },
  }).then(function (response) {
    // Stop handling of AJAX response if no valid response was returned
    if (!response) {
      return;
    }

    let forecasted = response;

    // Looping through the array and creating elements for each instance (i.e. day)

    let cardsArray = [];
    for (let i = 0; i < 4; i++) {
      // Receiving date from API
      let receivedDate = forecasted.data[i].valid_date;
      // Formatting date into something more readable
      const options = { weekday: "short", month: "short", day: "numeric" };
      let forecastDate = new Date(receivedDate).toLocaleDateString(
        "en-au",
        options
      );
      let localMinTemp = forecasted.data[i].min_temp;
      let localMaxTemp = forecasted.data[i].max_temp;
      let forecastIcon = forecasted.data[i].weather.icon;
      let forecastIconURL = weatherImageURL + forecastIcon + ".png";
      let forecastDescription = forecasted.data[i].weather.description;

      // Creating elements to display retrieved API data, using Bootstrap to ensure they are responsive and look good in their container
      let newCard = $("<div>").attr(
        "class",
        "d-flex col-md-3  flex-column justify-content-center align-items-center pt-3 weather-card"
      );
      let dateP = $("<h5>")
        .attr("id", "forecastDate")
        .text(forecastDate)
        .attr("class", "card-title");
      let mintempP = $("<p>")
        .attr("id", "localMinTemp")
        .attr("class", "card-text")
        .text("Min Temp " + localMinTemp + " °C");
      let maxtempP = $("<p>")
        .attr("id", "localMaxTemp")
        .attr("class", "card-text")
        .text("Max Temp " + localMaxTemp + " °C");
      let descP = $("<p>")
        .attr("id", "description")
        .attr("class", "card-text")
        .text(forecastDescription);
      let newIMG = $("<img>")
        .attr("src", forecastIconURL)
        .attr("id", "weatherIcon")
        .attr("alt", "Icon representing current weather conditions");

      // Appending newly created elements to the newCard, and pushing that to the cardsArray
      newCard.append(dateP);
      newCard.append(mintempP);
      newCard.append(maxtempP);
      newCard.append(descP);
      newCard.append(newIMG);
      cardsArray.push(newCard);
    }

    // creating the row that will house the cardsArray, and appending to existing html div
    let weatherRow = $("<div>").attr("class", "row");
    weatherRow.append(cardsArray);
    $("#weathercontainer").append(weatherRow);

    // capturing the country code which is used in the GNews API
    let catchCountry = forecasted.country_code;
    getNews(catchCountry);

    // capturing the city name which is displayed as the title for the forecast
    let cityName = forecasted.city_name;
    // adding text to html element representing the title of the forecast
    $("#weathertitle").html(cityName + ", " + catchCountry);

    // If showing the welcome screen, hide it and show the results screen and search bar.
    if ($("#welcomeScreen").css("display").toLowerCase() === "block") {
      $("#welcomeScreen").hide();
      setSearchBar("on");
      $("#resultsScreen").show();
    }

    // Check if the result is a favourite and call setFavStatus to show the right icon next to the header.
    let strWeatherTitle = $("#weathertitle").text();
    if (getFavourites().includes(strWeatherTitle)) {
      setFavStatus("on");
    }
    else {
      setFavStatus("off");
    }

  });
}

// Ajax call to GNews API. Response will be an object with an array of articles.
function getNews(catchCountry) {
  // NewsAPI
  let newsAPIKey = "0e966fb836610aa7a1a213a0b9d61c6b";
  let newsQueryURL = `https://gnews.io/api/v4/top-headlines?country=${catchCountry}&lang=en&max=5&token=${newsAPIKey}`;

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

// Function to render an individual news article on the page.
function renderArticle(objArticle) {
  // Take the object that's been passed to the function and create some string variables.
  let strTitle = objArticle.title;
  let strDescription = objArticle.description;
  let strURL = objArticle.url;
  let strImageURL = objArticle.image;
  let strSource = objArticle.source.name;

  // Build a new row to render.
  let newRow = $("<div>").addClass("row news-item align-items-center px-3 py-3");

  // Create the image column and element.
  let imageCol = $("<div>").addClass("col-md-4 col-lg-3 text-center");
  let articleImage = $("<img>")
    .addClass("article-image")
    .attr("src", strImageURL);
  imageCol.append(articleImage);

  // Create the article div with header/link
  let articleCol = $("<div>").addClass("col");
  let articleHeader = $("<h5>").addClass("row article-header py-2 mb-0");
  let articleLink = $("<a>").attr("href", strURL).text(strTitle);
  articleHeader.append(articleLink); // Append the <a> tag to the header

  // Create the article description.
  let articleDesc = $("<p>").addClass("row article-desc py-2 mb-0").text(strDescription);

  // Append article header and description to the div.
  articleCol.append(articleHeader);
  articleCol.append(articleDesc);

  // Append the image and article div to the new li then append to the list.
  newRow.append(imageCol);
  newRow.append(articleCol);
  $("#newscontainer").append(newRow);
}

// Saves the current search to favourites in localstorage.
function saveFavourite(strDestination) {
  // Call getFavourites to creaate the favourites array. This will either be empty or contain items already in storage.
  let arrFavourites = getFavourites();

  // Check if the new destination is already been saved. If not, save it.
  if (!arrFavourites.includes(strDestination)) {
    arrFavourites.push(strDestination);
  }

  // Save the array back to localstorage.
  localStorage.setItem("travelFavourites", JSON.stringify(arrFavourites));

  // Enable the favourites button.
  $("#btnFavourites").prop("disabled", false)

  // Open modal to inform the user it has been saved.
  $("#favAddedText").text(`${strDestination} added to favourites`);
  $("#favAdded").modal("show");
}

// Get favourites from localstorage or create an empty array. Return the array.
function getFavourites() {
  // Try and get stored items.
  let arrDestinations = localStorage.getItem("travelFavourites");

  // If there was nothing in loclstorage, create an empty array. Otherwise parse and assign to the array.
  if (arrDestinations === null) {
    arrDestinations = [];
  } else {
    arrDestinations = JSON.parse(arrDestinations);
  }

  // Return the array to the calling function.
  return arrDestinations;
}

// Function to populate the favourites modal and display it.
function showFavourites() {
  // Remove existing items from the favourites screen list.
  $(".fav-item").remove();

  // Populate the history list from localstorage.
  let arrFavourites = getFavourites();

  arrFavourites.forEach(function (favourite) {
    // Add a new li to the list.
    // First create the new li, add classes and text.
    let newLI = $("<li>");
    newLI.addClass("list-group-item d-flex align-items-left fav-item bg-dark text-white");
    newLI.text(favourite);

    // Add the search and remove buttons to the li.
    newLI.append(
      `<button class="btn btn-sm btn-primary ml-auto fav-search">Search</button>`
    );
    newLI.append(
      `<button class="btn btn-sm btn-danger ml-2 fav-remove">Remove</button>`
    );

    // Append the new favourite entry to the list.
    $("#favList").append(newLI);
  });

  // If there are entries to show, also show the remove all button.
  if (arrFavourites.length > 0) {
    $("#btnRemoveAll").show();
  } else {
    $("#btnRemoveAll").hide();
  }

  // Show the modal.
  $("#favModal").modal("show");
}

// Removes item from favourites when the remove button is clicked.
function removeFavourite(strFavourite) {
  // Try and get items from storage. An array will be returned but it will be empty if there was nothing
  // in storage.
  let arrFavs = getFavourites();

  // Filter the array to remove the city.
  arrFavs = arrFavs.filter((item) => item !== strFavourite);

  // If there's nothing left in the array, remove the entry from localstorage and disable favourites button.
  if (arrFavs.length === 0) {
    // Remove entry from localstorage.
    localStorage.removeItem("travelFavourites");
    // Disable favourites button.
    $("#btnFavourites").prop("disabled", true);
  } else {
    // Save back to localstorage.
    localStorage.setItem("travelFavourites", JSON.stringify(arrFavs));
  }
}

// Sets the favourites star icon according to whether the current search is in favourites.
function setFavStatus(state) {

  if (state === "on") {

    // Change from an outline star to a solid star if necessary.
    if ($("#btnAddFavourite").hasClass("far")) {
      $("#btnAddFavourite").removeClass("far").addClass("fas");
    }

    // Set the tooltip.
    $("#btnAddFavourite").attr("title", "Remove from favourites");

  }
  else if (state === "off") {

    // Change from solid to outline if necessary.
    if ($("#btnAddFavourite").hasClass("fas")) {
      $("#btnAddFavourite").removeClass("fas").addClass("far");
    }

    // Set the tooltip.
    $("#btnAddFavourite").attr("title", "Add to favourites");

  }

}

function showWelcomeScreen() {

  // See if any favourites have been stored and if so, enable the favourites button.
  if (getFavourites().length > 0) {
    $("#btnFavourites").prop("disabled", false)
  }

  // Turn off the top search bar.
  setSearchBar("off");

  // Show the welcome screen.
  $("#welcomeScreen").show();

}

function setSearchBar(state) {

  if ((state === "on") && ($("#userInputForm").hasClass("invisible"))) {

    $("#userInputForm").removeClass("invisible").addClass("visible");

  }
  else if ((state === "off") && ($("#userInputForm").hasClass("visible"))) {

    $("#userInputForm").removeClass("visible").addClass("invisible");

  }

}

// Listener for the form on the welcome screen.
$("#welcomeForm").on("submit", function (event) {

  event.preventDefault();

  // Grab the user input.
  let input = $("#welcomeUserInput").val().trim();

  // Call getWeather to do the search.
  getWeather(input);

});

// Listener for the add to favourites button.
$("#btnAddFavourite").on("click", function (event) {
  event.preventDefault();

  // Get user input from the title.
  let strInput = $("#weathertitle").text();

  // Return early if there's nothing there.
  if (strInput === "") {
    return;
  }

  if ($("#btnAddFavourite").hasClass("far")) {

    // Change from an outline star to a solid star.
    setFavStatus("on");

    // Call saveFavourite to save to localstorage.
    saveFavourite(strInput);

  }
  else {

    // Change from a solid star to an outline star.
    setFavStatus("off");

    // Call removeFavourite to remove from favourites.
    removeFavourite(strInput);

  }

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

    // Hide favourites screen;
    $("#favModal").modal("hide");

    // search again for the favourited city
    getWeather(strFavName);

  } else if ($(this).hasClass("fav-remove")) {
    // Call removeFavourite to remove the item from storage.
    removeFavourite(strFavName);

    // Set the favourite star icon
    setFavStatus("off");

    // Remove the item from the list.
    $(this).parent().remove();

    // If it was the last one hide the remove all button, change the add favourite button and disable the favourites button.
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

  // Hide the remove all button, change the add favourite button and disable the favourites button.
  $("#btnRemoveAll").hide();
  setFavStatus("off");
  $("#btnFavourites").prop("disabled", true);

});
