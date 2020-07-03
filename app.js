// text description function for wind direction
function toTextualDescription(deg) {
    if (deg > 337.5) return 'Northerly';
    if (deg > 292.5) return 'North Westerly';
    if (deg > 247.5) return 'Westerly';
    if (deg > 202.5) return 'South Westerly';
    if (deg > 157.5) return 'Southerly';
    if (deg > 122.5) return 'South Easterly';
    if (deg > 67.5) return 'Easterly';
    if (deg > 22.5) return 'North Easterly';
    if (deg <= 22.5) return 'No Wind';
};

// function to style UV color rating based on value
function uvColor(uv) {
    if (uv = [0 - 3]) return '<p style= "background-color: #669966;">Low</p>';
    if (uv = [3 - 6]) return '<p.style= "background-color: #F9A825;"> Moderate </p>';
    if (uv = [6 - 8]) return '<p.style= "background-color:#EF6C00;"> High </p>';
    if (uv = [8 - 11]) return '<p.style = "background-color: #B71C1C;"> Very High </p>';
    if (uv > 11) return '<p.style = "background-color:#6A1B9A;"> Extreme </p>';
};

// function to store city names in Local storage for future retrieval
function saveToLocalStorage(cityName) {
    citiesArray.push(cityName);
    if (citiesArray.length > 10) {
        citiesArray.shift();
    }
    localStorage.setItem("cities", JSON.stringify(citiesArray));
}

// create citiesArray and populate it with items from local storage
var citiesArray = JSON.parse(localStorage.getItem("cities"));
if (!citiesArray) {
    citiesArray = [];
}

// set city var from last history item
var cityStart = function() {
    city = citiesArray[9];
    handleCitySearchAlternative();
}

// set city var from search box
var citySearch = function() {
    city = $('#city-search').val();
    handleCitySearchAlternative();
}

// set city var from clicked history item
var cityClick = function() {
    city = event.target.id;
    handleCitySearchAlternative();
}


// search for city and AJAX events on click of city Button or history Name div
var handleCitySearchAlternative = function(event) {

    //push city name to your-city
    $("#your-city").text(city);

    //save city name to local storage
    saveToLocalStorage(city)

    // first AJAX call for the weather Now data
    $.ajax({
        method: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=af2763d6de673b2f09f9cfea0b035d97&units=metric",
        success: function(nowData) {
            console.log(nowData);
            var nowData = nowData;
            // second AJAX call for the UV data

            $.ajax({
                method: 'GET',
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=af2763d6de673b2f09f9cfea0b035d97&lat=" + nowData.coord.lat + "&lon=" + nowData.coord.lon,
                success: function(uvData) {
                    console.log(uvData)
                    // Formatting and adding to HTML the weather Now data
                    var weatherNow = "";
                    weatherNow += "<p>"; // 
                    weatherNow += "<p> Temp: " + (nowData.main.temp).toFixed(0) + "&degC</p><br>";
                    weatherNow += "<p> Wind: " + (nowData.wind.speed).toFixed(0) + " KM/hr <br>";
                    weatherNow += "<p> Humidity: " + (nowData.main.humidity).toFixed(0) + "%</p><br>";
                    weatherNow += "<p>" + (toTextualDescription(nowData.wind.deg)) + "</p><br>";
                    weatherNow += "<p> <span><em> " + nowData.weather[0].description + " </em></span></p><br>";
                    weatherNow += "<img src='https://openweathermap.org/img/w/" + nowData.weather[0].icon + ".png'><br>";
                    weatherNow += "</p>";
                    console.log(weatherNow);
                    $("#weatherNow").html(weatherNow);
                    // Formatting and adding to HTML the UV data
                    var uvF = "";
                    uvF += "<p>";
                    uvF += "<b><h3> UV Rating: </h3> " + uvColor(uvData.value) + "</b><br>";
                    uvF += "</p>";

                    $("#uv").html(uvF);

                    // third AJAX call for the weekly Forecast
                    $.ajax({

                        method: 'GET',
                        dataType: 'jsonp',
                        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=af2763d6de673b2f09f9cfea0b035d97&units=metric",
                        success: function(foreData) {
                            console.log(foreData);

                            // Formatting and adding to HTML the Weekly Forecast data
                            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                            const timesToDisplay = [0, 8, 16, 24, 32];
                            let d;
                            let dayName;

                            var wf = "";
                            wf += "<h2>" + foreData.city.name + "</h2>"; // City (displays once)
                            $.each(foreData.list, function(index, val) {
                                if (timesToDisplay.includes(index)) {
                                    d = new Date(foreData.list[index].dt * 1000);
                                    dayName = days[d.getDay()];
                                    wf += "<p>" // Opening paragraph tag
                                    wf += "<b>" + dayName + "</b>: " // Day
                                    wf += val.main.temp.toFixed(0) + "&degC" // Temperature
                                    wf += "<span> " + val.weather[0].description + "</span>"; // Description
                                    wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                                    wf += "</p>" // Closing paragraph tag
                                }
                            });
                            $("#forecast").html(wf);


                        }
                    });
                    // closing third ajax function (weekly Forecast)
                }
            });
            // closing second ajax function (UV data)
        }
    });
    // closing first ajax function (forecast now)
};
// closing city search function

// set variable so that the function that calls the last history item only runs once within the doc ready function
if (typeof runOnce === 'undefined') {
    var runOnce = false
}

// document ready function (on page load)
$(document).ready(function() {
    // appending todays time and date to header
    var today = moment().format("Do MMMM YYYY, h:mm");
    $("#today").append(today);
    // generating city array data
    citiesArray.forEach(function(cityName) {
        $newdiv1 = "<div class='historyName' id=" + cityName + ">" + cityName + "</div>",
            $("#searchHistory").prepend($newdiv1)
        // run function show last history item at page load
        if (!runOnce) {
            runOnce = true
            cityStart();
        }
    })
// close doc ready func

// initiate search from the search box click button
$("#cityBtn").on("click", citySearch);
// initiate search when you click on a history item
$("#searchHistory").on("click", cityClick);

});