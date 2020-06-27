$(document).ready (function () {
    
    var city = $('#city-name').val ();
    var itemKey = today;
    var key = "af2763d6de673b2f09f9cfea0b035d97";
    var text = city; 
    var today = moment().format("Do MMMM YYYY, h:mm");
    var urlNow = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={appid}";
    var urlFore = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={appid}";
    var urlUv = "https://api.openweathermap.org/data/2.5/uvi?appid=${appid}&lat=${lat}&lon=${lon}";

    $.when(
        $("#cityBtn").click(function(event) {
            event.preventDefault()},
    
    $.ajax ({
        q : city,
        appid : key,
        units : "metric",
        type: 'GET',
        dataType: 'jsonp',
        url: urlNow,
        success: function(nowData) {console.log (nowData),
        
    $.ajax ({
        q : city,
        appid : key,
        units : "metric",
        type: 'GET',
        dataType: 'jsonp',
        url: urlFore, 
        success: function (foreData) {console.log (foreData),
                
    $.ajax ({
        q : city,
        appid : key,
        units : "metric",
        type: 'GET',
        dataType: 'jsonp',url: urlUv, 
        lat:  foreData.city.coord.lat,
        lon: foreData.city.coord.lon,
        success: function (uvData) {console.log (uvData),
                        
        
    $.then (function () {
        $("#your-city").append(city);
            localStorage.setItem(itemKey, text, nowData, foreData, uvData),
        
            
    forecastNow(),

    function nowFormat () {
        WeatherNow = "",
        WeatherNow += "<h2>" + nowData.city.name + "</h2>";                     
        WeatherNow += "<p>" // 
        WeatherNow += "<b> Today "  + dayName +  "</b>: "
        WeatherNow += (val.main.temp).toFixed(0); + "&degC" // Temperature
        WeatherNow += "<span> " + val.weather[0].description + "</span>"; // Description
        WeatherNow += "<img src='xhttp://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
        WeatherNow += "</p>" // Closing paragraph tag'
        },

    nowFormat(),   

    function forecastFormat(){ 
        const timesToDisplay = [0, 8, 16, 24, 32];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var foreData = foreData.data; 

        $.each (foreData.list, function (index, val) {
            if (timesToDisplay.includes(index)) {
                var d = new Date(foreData.list[index].dt * 1000);
                var dayName = days[d.getDay()];
                console.log(dayName); 
        
        var Forecast = '';
            Forecast += "<h2>" + foreData.city.name + "Future Forecast </h2>"; 
            Forecast += "<p>" // Opening paragraph tag
            Forecast += "<b> "  + dayName +  "</b>: " // Day
            Forecast += (val.main.temp).toFixed(0); + "&degC" // Temperature
            Forecast += "<span> " + val.weather[0].description + "</span>"; // Description
            Forecast += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
            Forecast += "</p>" // Closing paragraph tag'
            
            };

    forecastFormat();

        function uvFormat(){
        var uvData = uvData.value
        uv = '';
        uv += "<div>";
        uv += "<h2> Today's UV Forecast </h2>";
        uv += "<p>"; 
        uv += "<b> UV Index"  + uvI +  "</b>: ";
        uv += "</p>"
        uv += "</div>"

    };

    $("#WeatherNow").html(WeatherNow);
    $("#Forecast").html(Forecast);
    $("#uv").html(uv);

    uvFormat();
})}})}})}})}})))})