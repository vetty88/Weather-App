$(document).ready (function () {
    
    var today = moment().format("Do MMMM YYYY, h:mm");

    $("#cityBtn").click(function(event) {
        event.preventDefault();
        $("#your-city").empty();
        $("#city-name").empty();
        var city = $('#city-name').val ();
        console.log(city);
        },

        $("#your-city").append(city);

        function storeList(){        
        var itemKey = today;
        var text = city;   
        const cities = localStorage.setItem(itemKey, text);
        console.log(cities);

        $("#search-history").on("click", "item", function () {
            city = $(this).text().replace("x", "")
            console.log($(this).text())
        },
        cities.push(city);
            $(".search").val("");
                storeList();
                renderList();
                weather();
        
        function renderList() {
        $("#cityBtn").on("click", function(event) {
            cities.push(city);
                for (var i = 0; i < cities.length; i++) {
                    var a = "<p>" + ("city", cities[i]) + (text(cities[i])) + "</p><br>";
                        $("#search-history").append( a )
                        a += $();
                }    
                    if (localStorage.getItem("cities") != null) {
                        var historyTmp = localStorage.getItem("cities");
                        var oldhistoryarray = historyTmp.split('|');
                        $('#search-history').empty();
                    }
                        for(var i =0; i<oldhistoryarray.length; i++) {
                            $('#search-history').append('<p>'+oldhistoryarray[i]+'</p>');
                        }
                    }
        )}
                    renderList(),
            
function weather(){
    $.ajax ({
        method: 'GET',
        dataType: 'jsonp',
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=af2763d6de673b2f09f9cfea0b035d97&units=metric",
        success: function(nowData) {
            console.log (nowData)

            function  toTextualDescription(deg){
                if (deg>337.5) return 'Northerly';
                if (deg>292.5) return 'North Westerly';
                if(deg>247.5) return 'Westerly';
                if(deg>202.5) return 'South Westerly';
                if(deg>157.5) return 'Southerly';
                if(deg>122.5) return 'South Easterly';
                if(deg>67.5) return 'Easterly';
                if(deg>22.5){return 'North Easterly';}
                return 'Northerly';
            }

                
                function weatherNow () {
                    weatherNow = "",                   
                    weatherNow += "<p>"; // 
                    weatherNow += "<p> Temp: " + (nowData.main.temp).toFixed(0) + "&degC</p><br>";
                    weatherNow += "<p> Wind: " + (nowData.wind.speed).toFixed(0) + " KM/hr <br>";
                    weatherNow += "<p> Humidity: " + (nowData.main.humidity).toFixed(0) + "%</p><br>";
                    weatherNow += "<p>" + (toTextualDescription(nowData.wind.deg)) + "</p><br>";
                    weatherNow += "<p> <span><em> " + nowData.weather[0].description + " </em></span></p><br>"; 
                    weatherNow += "<img src='https://openweathermap.org/img/w/" + nowData.weather[0].icon + ".png'><br>"; 
                    weatherNow += "</p>";
                }
                    $("#weatherNow").html(weatherNow);
                },
                    weatherNow() {

        function uvNow() {
            $.ajax ({
            method: 'GET',
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=af2763d6de673b2f09f9cfea0b035d97&lat=" + nowData.coord.lat + "&lon=" + nowData.coord.lon,
            success: function (uvData) {
                console.log (uvData)

                function uvColor(){
                    if(uv = [0-3]) return  '<p style= "background-color: #669966;">Low</p>';
                    if(uv = [3-6]) return '<p.style= "background-color: #F9A825;"> Moderate </p>';
                    if (uv = [6-8]) return '<p.style= "background-color:#EF6C00;"> High </p>';
                    if (uv = [8-11]) return '<p.style = "background-color: #B71C1C;"> Very High </p>';
                    if (uv >11) return '<p.style = "background-color:#6A1B9A;"> Extreme </p>';
                };
                uvColor();
            }
                function uvFormat(){
                    uv = "";
                    uv += "<p>"; 
                    uv += "<b><h3> UV Rating: </h3> " + (uvColor(uvData.value)) +  "</b><br>";
                    uv += "</p>";
                
                    $("#uv").html(uv),
                            },
                            uvFormat();

    $.ajax ({      
        method: 'GET',
        dataType: 'jsonp',
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=af2763d6de673b2f09f9cfea0b035d97&units=metric",
        success: function (foreData) {
            
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const timesToDisplay = [0, 8, 16, 24, 32];
            let d;
            let dayName;
            var wf = "";
            wf += "<h2>" + foreData.city.name + "</h2>"; // City (displays once)
            $.each(foreData.list, function(index, val) {
              if(timesToDisplay.includes(index)){
                d = new Date(foreData.list[index].dt * 1000);
                dayName = days[d.getDay()];
                wf += "<p>" // Opening paragraph tag
                wf += dayName + "<br>"
                wf += "<p> HI: " + (val.main.temp_max).toFixed(0) + "&degC<br> </p>" // Temperature
                wf += "<p> LO: " + (val.main.temp_min).toFixed(0) + "&degC<br> </p>"
                wf += "<p> HUMID: " + (val.main.humidity).toFixed(0) + " % <br> </p>" 
                wf += "<span> " + val.weather[0].description + "</span><br>"; // Description
                wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'><br>" // Icon
                wf += "</p><br>" // Closing paragraph tag
                }
            $("#forecast").html(wf);
            })
        }}
    )},
        
        uvNow()
        
    },

                        
            
        weather()
            )}
        
