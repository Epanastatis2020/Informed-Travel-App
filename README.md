# INFORMED TRAVELLER

A simple app which allows a user to nominate a travel destination, and then see news and weather relevant to that area.

This has been achieved using the [Weatherbit.io API](https://www.weatherbit.io/api) and the [GNews API](https://gnews.io/).

## Contents

<p>
The app is composed of 1 page, index.html. It includes a javascript file sciprt.js, which provides all the functionality. There is also a style.css sheet which provides auxiliary styling, as most of the styling is done via Bootstrap (using a Bootswatch theme).
</p>

## User Story

```
AS A traveler
I WANT to easily find and view the weather and news for my travel destination
SO THAT I can be prepared upon arrival for both the environmental and social climate
```

## Summary of project

The app has been designed using bootstrap and bootswatch templates to ensure it remains dynamic and usable in different screen sizes (including mobile).

It uses the Weatherbit.io and GNews APIs to pull back weather and news information relevant to the city name input by the user.

It features a input form which allows the user to search on a city. It features a button which will save a searched city to the favourites list, from which saved cities can be searched again, or deleted from local storage.

For the weather, four days of data are displayed including the current day. For the news, the five top articles are displayed.
For both APIs, AJAX queries are used to interrogate the data sources and the required information is appended to the DOM using Javascript/Jquery.

Error handling is present, alerting the user to an invalid or incorrect search term.

## Built With

- [VScode](https://code.visualstudio.com/) - The editor of choice
- [Git for Windows](https://gitforwindows.org/) - Brings the full feature set of Git SCM to Windows
- [jQuery](https://jquery.com/) - jQuery is a fast, small, and feature-rich JavaScript library.
- [Bootstrap](https://getbootstrap.com/) - The world’s most popular front-end open source toolkit
- [Bootswatch](https://bootswatch.com/) - Free themes for Bootstrap
- [FontAwesome](https://fontawesome.com/) - The web's most popular icon set and toolkit.
- [Weatherbit.io API](https://www.weatherbit.io/api) - The High Performance Weather API for all of your Weather data needs.
- [GNews API](https://gnews.io/) - GNews is an API to search for articles from a variety of sources, including Google News.
- [Github](https://github.com/) - GitHub is built for collaboration.
- [Slack](https://slack.com/intl/en-au/) - Build stronger relationships with external partners

## Screenshots

![Landing Page](https://user-images.githubusercontent.com/65388616/94657698-2e56cf80-0345-11eb-8469-58474a0885de.PNG)

![Search Results](https://user-images.githubusercontent.com/65388616/94657686-272fc180-0345-11eb-9d29-af9933ed17ff.PNG)

![Favourites Modal](https://user-images.githubusercontent.com/65388616/94657652-17b07880-0345-11eb-9800-0ab159bf714a.PNG)

## Licence

​
Licensed under the MIT License
​

## Link to the site

<a href="https://epanastatis2020.github.io/Informed-Travel-App/">Please visit the site on GitHub Pages</a>

## Acknowledgements

We would like to thank Klaus, Sandes and Ali for their assistance and guidance throughout this project.

## Authors

- **ANDREW MIDDLETON** -
  https://github.com/andrewmiddleton1

- **CON ANGELAKIS** -
  https://github.com/Epanastatis2020

- **TIM SILBY** -
  https://github.com/timsilby
