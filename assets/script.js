function createCitylist(citySearchList) {
    $('#city-list').empty();

    var keys = Object.keys(citySearchList);
    for (var i=0; i < keys.length; i++) {
        var cityListEntry = $("<button>");
        cityListEntry.addClass("list-group-item list-group-item-action");

        var splitStr = keys[i].toLowerCase().split(" ");
        for (var j = 0; j < splitStr.length; j++) {
            splitStr[j] = 
            splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
        }
        var titleCasedCity = splitStr.join(" ");
        cityListEntry.text(titleCasedCity);

        $("#city-list").append(cityListEntry);
    }
}

function populateCityWeather(city, citySearchList) {
    createCitylist(citySearchList);

    var queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
        city;

    var queryUrl2 = 
        "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
        city;
    
    var latitude;

    var longitude;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })

    .then(function(weather) {

        console.log(queryUrl);

        console.log(weather);

        var nowMoment = moment();

        var displayMoment = $("<h3>");
        $("#city-name").empty();
        $("#city-name").append(
            displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
        );

        var cityName = $("<h3>").text(weather.name);
        $("#city-name").prepend(cityName);

        var weatherIcon = $("<img>");
        weatherIcon.attr(
            "src",
            "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
        );
        $("#current-icon").empty();
        $("#current-icon").append(weatherIcon);

        $("#current-temp").text("Temperature " + weather.main.temp + " °F");
        $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
        $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH")
    })
}