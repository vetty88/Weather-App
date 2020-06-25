$(document).ready (function () {
    
    var city = $('#city-name').val ();
    var itemKey = today;
    var key = "af2763d6de673b2f09f9cfea0b035d97";
    var text = city;
    var today = moment().format("Do MMMM YYYY, h:mm:ss a");
    
    $.when(
        $("#cityBtn").click(function(event) {
            event.preventDefault()},

    $.getJSON (function () {
        $.ajax({
            q : city,
            appid : key,
            units : "metric",
            lat: forecastData.city.coord.lat,
            lon: forecastData.city.coord.lon,
        },

    $.when ($.ajax("xhttp://api.openweathermap.org/data/2.5/weather?q={city name}&appid="), 
    $.ajax("xhttp://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=)"),
    $.ajax("xhttp://api.openweathermap.org/data/2.5/uvi?appid=${apiKey1}&lat=${lat}&lon=${lon}"))

    .then(function (resp1, resp2, resp3){

    console.log (resp1);
    console.log (resp2);
    console.log (resp3);
    },
        
    $.then (function () {
        $("#your-city").append(city);
            localStorage.setItem(itemKey, text, resp1, resp2, resp3)
        },
            
    forecastNow(),

    function nowFormat () {
        wf1 = "",
        wf1 += "<h2>" + resp1.city.name + "</h2>";                     
        wf1 += "<p>" // 
        wf1 += "<b> Today "  + dayName +  "</b>: "
        wf1 += (val.main.temp).toFixed(0); + "&degC" // Temperature
        wf1 += "<span> " + val.weather[0].description + "</span>"; // Description
        wf1 += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
        wf1 += "</p>" // Closing paragraph tag'
        },

    nowFormat(),   

    function forecastFormat(){ 
        const timesToDisplay = [0, 8, 16, 24, 32];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var resp2 = resp2.data; 

        $.each (resp2.list, function (index, val) {
            if (timesToDisplay.includes(index)) {
                var d = new Date(resp2.list[index].dt * 1000);
                var dayName = days[d.getDay()];
                console.log(dayName); 
        
        var wf2 = '';
            wf2 += "<h2>" + resp2.city.name + "Future Forecast </h2>"; 
            wf2 += "<p>" // Opening paragraph tag
            wf2 += "<b> "  + dayName +  "</b>: " // Day
            wf2 += (val.main.temp).toFixed(0); + "&degC" // Temperature
            wf2 += "<span> " + val.weather[0].description + "</span>"; // Description
            wf2 += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
            wf2 += "</p>" // Closing paragraph tag'
            
            };

    forecastFormat();

        function uvFormat(){
        var resp3 = resp3.value
        wf3 = '';
        wf3 += "<div>";
        wf3 += "<h2> Today's UV Forecast </h2>";
        wf3 += "<p>"; 
        wf3 += "<b> UV Index"  + uvI +  "</b>: ";
        wf3 += "</p>"
        wf3 += "</div>"

    };

    $("#wf1").html(wf1);
    $("#wf2").html(wf2);
    $("#wf3").html(wf3);

    uvFormat();
        })})))})))
})
