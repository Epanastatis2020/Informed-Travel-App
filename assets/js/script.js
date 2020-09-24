
// NewsAPI

let strNewsAPIKey = "0e966fb836610aa7a1a213a0b9d61c6b";
let strCountryCode = "au";
let newsQueryURL = `https://gnews.io/api/v4/top-headlines?country=${countryCode}&max=5&token=${newsAPIKey}`;


// Ajax call to GNews API. Response will be an object with an array of articles.
$.ajax({
  type: "GET",
  url: newsQueryURL,
  success: function (response) {

    // Get the array of returned articles from the response.
    let arrArticles = response.articles;

    // Loop through the array and call renderArticle to display the each one.
    arrArticles.forEach(article => {

      console.log(article);
      renderArticle(article);

    })

  }

});


function renderArticle(objArticle) {


  // Take the object that's been passed to the function and create some string variables.
  let strTitle = objArticle.title;
  let strDescription = objArticle.description;
  let strURL = objArticle.url
  let strImageURL = objArticle.image;
  let strSource = objArticle.source.name;

  console.log(strTitle + strDescription + strURL + strImageURL + strSource);

  // Build a new list item to render.
  let newLI = $("<li>").addClass("media");

  // Create the image element.
  let articleImage = $("<img>").addClass("mr-3 article-image").attr("src", strImageURL);

  // Create the article div with header/link
  let articleDiv = $("<div>").addClass("media-body");
  let articleHeader = $("<h5>").addClass("mt-0 mb-1");
  let articleLink = $("<a>").attr("href", strURL).text(strTitle);
  articleHeader.append(articleLink);      // Append the <a> tag to the header

  // Append article header and description to the div.
  articleDiv.append(articleHeader);
  articleDiv.append(strDescription);

  // Append the image and article div to the new li then append to the list.
  newLI.append(articleImage);
  newLI.append(articleDiv);
  $("ul.list-unstyled").append(newLI);


}