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
 

var citiesArray = JSON.parse(localStorage.getItem("cities"));
    if (!citiesArray) {
        citiesArray = [];
    }


// search for city and AJAX events on click of city Button or history Name div
// $("#cityBtn").on("click", handleCitySearch);
var handleCitySearchAlternative = function(event) {
    console.log("clickevent");
    event.preventDefault();

    if (event.target.id === "cityBtn"){
        var city = $('#city-search').val();
    } else if (event.target.id != null){
        var city = event.target.id;
    } else {
        var city = citiesArray[9]
        
    }
    console.log(city)
                $("#your-city").text(city);
                if(event.type === "submit")
                    city = document.getElementById("#your-city");

                console.log(city),

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
        // closing click function

        // document ready function (on page load)
$(document).ready(function() {
    // appending todays time and date to header
    var today = moment().format("Do MMMM YYYY, h:mm");
    $("#today").append(today);

    console.log(citiesArray);
    // generating city array data
    citiesArray.forEach(function(cityName) { 
    console.log(cityName)
    $newdiv1 = "<div class='historyName' id=" +cityName+ ">" + cityName + "</div>",
    $("#searchHistory").prepend($newdiv1)
    // show last history item at page load
    $(document).ready(handleCitySearchAlternative)

});



    // initiate search from the search box click button
        $("#cityBtn").on("click", handleCitySearchAlternative);
    // initiate search when you click on a history item
        $("#searchHistory").on("click", handleCitySearchAlternative);
    // show last history item at page load
        $

});
// closing document ready function                       