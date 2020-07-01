
$(document).ready(function() {

var today = moment().format("Do MMMM YYYY, h:mm");
$("#today").append(today);

function cityButton() {

    $("#cityBtn").click(function(event) {
    event.preventDefault()

    var city = $('#city-search').val ();
    $("#your-city").append(city);
    if( event.type === "submit" )
    city = document.getElementById("#your-city");
    
    console.log(city);}

        // } else if ( event.type === "click" ){
        // var city =  event.target.children[0].value;

)}
cityButton(),
    
        function weather() {
        
        $.ajax ({
            method: 'GET',
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=af2763d6de673b2f09f9cfea0b035d97&units=metric",
                success: function(nowData){
                    console.log (nowData),
                

            function toTextualDescription(deg) {
                if (deg>337.5) return 'Northerly';
                if (deg>292.5) return 'North Westerly';
                if(deg>247.5) return 'Westerly';
                if(deg>202.5) return 'South Westerly';
                if(deg>157.5) return 'Southerly';
                if(deg>122.5) return 'South Easterly';
                if(deg>67.5) return 'Easterly';
                if(deg>22.5){return 'North Easterly';}
                return 'Northerly';
                },
                toTextualDescription(),

            function weatherNow (){
                weatherNow = "",                   
                weatherNow += "<p>"; // 
                weatherNow += "<p> Temp: " + (nowData.main.temp).toFixed(0) + "&degC</p><br>",
                weatherNow += "<p> Wind: " + (nowData.wind.speed).toFixed(0) + " KM/hr <br>",
                weatherNow += "<p> Humidity: " + (nowData.main.humidity).toFixed(0) + "%</p><br>",
                weatherNow += "<p>" + (toTextualDescription(nowData.wind.deg)) + "</p><br>",
                weatherNow += "<p> <span><em> " + nowData.weather[0].description + " </em></span></p><br>",
                weatherNow += "<img src='https://openweathermap.org/img/w/" + nowData.weather[0].icon + ".png'><br>",
                weatherNow += "</p>",
                    
            weather();     
            weatherNow();
                    $("#weatherNow").html(weatherNow),
            function uvNow() {
            $.ajax ({
                method: 'GET',
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=af2763d6de673b2f09f9cfea0b035d97&lat=" + nowData.coord.lat + "&lon=" + nowData.coord.lon,
                success: function (uvData) {
                console.log (uvData)}
            },
                function uvColor(){
                    if(uv = [0-3]) return  '<p style= "background-color: #669966;">Low</p>';
                    if(uv = [3-6]) return '<p.style= "background-color: #F9A825;"> Moderate </p>';
                    if (uv = [6-8]) return '<p.style= "background-color:#EF6C00;"> High </p>';
                    if (uv = [8-11]) return '<p.style = "background-color: #B71C1C;"> Very High </p>';
                    if (uv >11) return '<p.style = "background-color:#6A1B9A;"> Extreme </p>';
                },
                uvColor(),   
                
                function uvFormat() {
                    uvF = "";
                    uvF += "<p>"; 
                    uvF += "<b><h3> UV Rating: </h3> " + (uvColor(uvData.value)) +  "</b><br>";
                    uvF += "</p>";
                },
                uvFormat(),
                    $("#uv").html(uvF),
                        uvNow(),
  
    function forecast(){
        
    $.ajax ({  
           
        method: 'GET', 
        dataType: 'jsonp',
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + (document.getElementById("#your-city")) + "&appid=af2763d6de673b2f09f9cfea0b035d97&units=metric",
            success: function (foreData) {
                console.log (foreData)
                
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const timesToDisplay = [0, 8, 16, 24, 32];
            
            let d;
            let dayName;
            var wf = "";
            wf += "<h2>" + foreData.city.name + "</h2>"; // City (displays once)

            $.each(foreData.list, function(index, val){
                if(timesToDisplay.includes(index))
                d = new Date(foreData.list[index].dt * 1000);
            dayName = days[d.getDay()];
                wf += "<p>",
                wf += dayName + "<br>",
                wf += "<p> HI: " + (val.main.temp_max).toFixed(0) + "&degC<br> </p>",
                wf += "<p> LO: " + (val.main.temp_min).toFixed(0) + "&degC<br> </p>",
                wf += "<p> HUMID: " + (val.main.humidity).toFixed(0) + " % <br> </p>", 
                wf += "<span> " + val.weather[0].description + "</span><br>",
                wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'><br>",
                wf += "</p><br>",
            
                    $("#forecast").html(wf);
                    },  
                forecast(),
                   
            
    function storeList() {        
        var itemKey = today;
        var text = city;   
        const cities = localStorage.setItem(itemKey, text);
        console.log(cities);
        storeList();
        })
        }}
    )}
            )}
    }}
        })
    }}
)
        


// },
// function historyUpdate (currentCity) {
// var historyArray = [];

// if( currentCity !== "" ){
// // Add current city to history array
// historyArray.push(currentCity);
// }

// // If history array exceeds 10-item limit, remove the first (oldest) city
// if( historyArray.length > 10 ){
// historyArray.shift();


// // Empty current display of history array
// $("#search-history").empty();
// }
// // Display each item of current history array
// historyArray.forEach(function(city) {
// $("#search-history").prepend($(`<div class='historyCity'>${city}</div>`))

// // Handle the event for loading data for a new city
// var handleCitySearch = function(event) {
// // If this was triggered by an event rather than page load,
// if( event ) {
// event.preventDefault();
// // Grab input for current city search depending on whether it was a submit event or click event
//

// // Else if this is triggered by page load,
// } else {
// // Load last searched city if it exists, otherwise load Sydney
// if( localStorage.getItem("currentCity") ){
// var currentCitySearch = localStorage.getItem("currentCity");
// } else {
// var currentCitySearch = "Sydney";
// }

// // When the search form is submitted, run function for displaying data for searched city
// $("#cityBtn").on("submit", handleCitySearch);

// // When a city from the history list is clicked, run function for displaying data for that city
// $("#historyDiv").on("click", ".historyCity", handleCitySearch);

// // On page load, load initial current city
// handleCitySearch();
