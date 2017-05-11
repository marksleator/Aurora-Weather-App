$(document).ready(function(){
    
  
    $("#submitCity").click(function(){
        $("#currentIcon").empty();
        return getWeather();
        
    });
    
    
});


    
function getWeather(){
    var city = $("#city").val();
    
    if(city !=''){
        
        $.ajax({
            url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&appid=4007278f5c2b8ebd355c5ee1df4ee524",
                type:"GET",
                dataType: "jsonp",
                success: function(data){
                    
                    
                        
                    var location = data.name;
                    var country = data.sys.country;
                    var currentTemperature = Math.round (data.main.temp) +"&deg;C";
                    var currentWeather = data.weather[0].description;
                    var icon = data.weather[0].icon;
                    var id = data.weather[0].id;
                    
                    
                    
                    var windSpeed = data.wind.speed + " m/s";
                    var sunrise = moment.unix(data.sys.sunrise).format('h:mm A');
                    var sunset = moment.unix(data.sys.sunset).format('h:mm A');
                    var clouds = data.clouds.all + "%";
                    var humidity = data.main.humidity + "%";
                    
                    $("#location").html(location)
                    $("#country").html(country)
                    $("#currentTemperature").html(currentTemperature)
                    $("#currentWeather").html(currentWeather)
                    
                                        
                    $("#windSpeed").html(windSpeed)
                    $("#sunrise").html(sunrise)
                    $("#sunset").html(sunset)
                    $("#clouds").html(clouds)
                    $("#humidity").html(humidity)
                    
                    
                    var iconSrc = "images/icons/" + icon + ".png";
                    $('#currentIcon').prepend('<img src="' + iconSrc + '">');
                    
                    var backgroundImage = chooseImage(data.weather[0].id)

                    $("body").css("background-image", "url(images/backgrounds/" + backgroundImage + ")");
                    
                                                      
                        // chooseImage() definition
                        function chooseImage(id) {
                            
                            if (icon == "01n") {
                                 return 'night_clear.jpg' }
                            
                            
                            if  (id == 800) {
                                 return 'clear.jpg'
                            }
                            
                            if (icon == "02n") {
                                 return 'night_clouds.jpg' }
                            
                            if (id == 801) {
                                 return 'few_clouds.jpg'
                            
                            
                            }                             
                            
                            
                            if (icon == "02n") {
                                 return 'night_clouds.jpg'}
                            
                            if (id == 802) {
                                 return 'scattered_clouds.jpg'
                                 
                                                        }
                                 
                            
                            
                            if (icon == "04n") {
                                 return 'night_broken.jpg'}
                            
                            if (id == 803) {
                                 return 'broken_clouds.jpg'
                                 
                                 
                            }
                            
                            
                                                        
                            if (id == 804) {
                                 return 'overcast_clouds.jpg'
                                 
                                 
                            }
                            
                            
                            if (id == 904) {
                                 return 'hot.jpg'
                            }
                            
                            if (id >= 200 && id <= 232) {
                                 return 'thunderstorm.jpg'
                            }
                            
                            if (id >= 300 && id <= 321) {
                                 return 'drizzle.jpg'
                            }
                            
                            if (id >= 500 && id <= 531) {
                                 return 'rain.jpg'
                            }
                            
                            if (id >= 600 && id <= 622) {
                                 return 'snow.jpg'
                            }
                            
                            if (id >= 700 && id <= 781) {
                                 return 'fog.jpg'
                            }
                            
                        }
                            
                            
                    
                    
                    window.location.hash = '#secondPage';
                    
                    $("#city").val('');
                }
        });
        
        
        
        $.ajax({
            url:'http://api.openweathermap.org/data/2.5/forecast?q=' +city+ "&units=metric" + "&cnt=8" + "&appid=4007278f5c2b8ebd355c5ee1df4ee524",
                type: "GET",
                datatype: "jsonp",
                success: function(data){
                    
                    var table= '';
                    
                               
                    
                    for(var i= 0; i < data.list.length; i++){
                        table += "<tr>";
                        
                        table += "<td>" + moment.unix(data.list[i].dt).format('ddd, hh:mm A') + "</td>";                      
                        table += "<td><img src='images/icons/small/"+data.list[i].weather[0].icon+".png'></td>";
                        
                        table += "<td>" + Math.round(data.list[i].main.temp) + "&deg;C </td>";
                                                
                        table += "</tr>";
                    }
                    
                        $("#hourlyWeather").html(table);
                        $("#city").val('');
                }
        });
        
        $.ajax({
            url:'http://api.openweathermap.org/data/2.5/forecast/daily?q=' +city+ "&units=metric" + "&cnt=8" + "&appid=4007278f5c2b8ebd355c5ee1df4ee524",
                type: "GET",
                datatype: "jsonp",
                success: function(data){
                    
                    var table= '';
                    
                                
                    for(var i= 0; i < data.list.length; i++){
                        table += "<tr>";
                        
                        table += "<td>" + moment.unix(data.list[i].dt).format('dddd, Do MMMM') + " </td>";
                        table += "<td><img src='images/icons/small/"+data.list[i].weather[0].icon+".png'></td>";
                        table += "<td>" + Math.round(data.list[i].temp.min) + "&deg;C </td>";
                        table += "<td>" + Math.round(data.list[i].temp.max) + "&deg;C </td>";
                        
                                            
                        table += "</tr>";
                    }
                    
                        $("#forecastWeather").html(table);
                    
                                
                        $("#city").val('');
                    
                        var temperatureMin = Math.round (data.list[1].temp.min) +"&deg;C";   
                        var temperatureMax = Math.round (data.list[1].temp.max) +"&deg;C";
                    
                        $("#temperatureMin").html(temperatureMin)
                        $("#temperatureMax").html(temperatureMax)
                }
            
            
            
            
        });
        
        
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>")
    }
    
}






