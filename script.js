
// variable array to store history
// varaible for the Weather API Key
var weatherAPIkey = "870ca5ad879da9e65c431a872094b603" 


var cityhistory = []

// 3 variables: 1. history list 2. showing current weather results 3. showing forecast results

var currentweatherEl = $("#currentweather")
var forecastEl = $("#forecast")
var historyEl = $("#historylist")
var searchEl = $("#search")
var searchinputEl = $("#searchinput")

searchEl.on("click", function(){
    var cityname = searchinputEl.val()

    currentweather(cityname)
    createweathercard(cityname)
    getfivedayforecast(cityname)
})

function currentweather(cityname) {

    currentweatherEl.empty()
    var currentweatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + weatherAPIkey + "&units=imperial"
    $.ajax({
        url: currentweatherURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
    
          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.name;
          console.log(results)
        
            var p = $("<button>").text(results);
            var list = $("<ul>")
            list.prepend(p)

            console.log(p)

            cityhistory.push(list)
            for (var i=0; i<cityhistory.length; i++){

                historyEl.prepend(cityhistory[i]);
            }

            var lat = response.coord.lat
            var lon = response.coord.lon

            addUVindex(lat, lon)

        });
    }

function createweathercard(cityname){

    var currentweatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + weatherAPIkey + "&units=imperial"
    $.ajax({
        url: currentweatherURL,
        method: "GET"
      })

      .then(function(response) {
    
        console.log(response);
        // storing the data from the AJAX request in the results variable
        
        var name = $("<p>").text(response.name)
        var temp = $("<p>").text(response.main.temp)
        var hum = $("<p>").text(response.main.humidity)
        var wind = $("<p>").text(response.wind.speed)

        
       
        var p = $("<div>").append(name, temp, hum, wind);

            currentweatherEl.append(p)
})
}

function addUVindex(lat, lon){

    var UVindex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + weatherAPIkey + "&lat="+ lat + "&lon=" + lon 

    $.ajax({
        url: UVindex,
        method: "GET"
      })

      .then(function(response) {
    
        console.log(response);
        // storing the data from the AJAX request in the results variable

        
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(response.value);
        // change color depending on uv value
        if (response.value < 3) {
          btn.addClass("btn-success");
        }
        else if (response.value < 7) {
          btn.addClass("btn-warning");
        }
        else {
          btn.addClass("btn-danger");
        }
        $("#today .card-body").append(uv.append(btn));


        currentweatherEl.append(uv)
        
       
})
}


function getfivedayforecast(cityname){

    console.log("hi")

    var fivedayforecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + weatherAPIkey+ "&units=imperial"

    $.ajax({
        url: fivedayforecast,
        method: "GET"
      })

      .then(function(response) {
    
        console.log(response);
        // storing the data from the AJAX request in the results variable

        

        // var p = $("<div>").text(response);
        //     var list = $("<p>")
        //     list.prepend(p)

        for (var i=0; i<response.list.length; i++){

            var temp = $("<p>")
            var hum = $("<p>")

            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

            temp.text(response.list[i].main.temp_max)
            var forecastdiv = $("<div>")
            

            hum.text(response.list[i].main.humidity)
            forecastdiv.append(temp, hum)

            console.log(forecastdiv)

            
        }
        forecastEl.append(forecastdiv);
    }
      })


}


// eventlistner when user click search button
// dynamic click event for each of the search history's results
// both eventlistener will call the first and last functions

// first will pass in input box value parameter is cityname
// second function event.target.innerText will give you the text of the button, whch is the city name
    // Moderate Severe UV

// results of first and last function will update HTML


// function to get current weather, with the parameter of city name
// function to query the UV index, parameter of latitude and longtitude
// latitude and longtitude data comes from results of the search function
// one final function for another AJAX call of forecast
