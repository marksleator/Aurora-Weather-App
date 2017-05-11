$(document).ready(function(){
    
    $("#submitCity").click(function(){
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
                    var currentTemperature = data.main.temp +"&deg;C";
                    var currentWeather = data.weather[0].description;
                    var icon = data.weather[0].icon;
                    
                    
                    var windSpeed = data.wind.speed + "m/s";
                    var sunrise = data.sys.sunrise;
                    var sunset = data.sys.sunset;
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
                    
                    
                    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
                    $('#currentIcon').prepend('<img src="' + iconSrc + '">');
                    
                    
                    
                    
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
                        
                        table += "<td>" +data.list[i].dt_txt + "</td>";                      
                        table += "<td><img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>";
                        table += "<td>" +data.list[i].main.temp + "&deg;C </td>";
                                                
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
                        
                        table += "<td>" +data.list[i].dt + "&deg; </td>";
                        table += "<td><img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>";
                        table += "<td>" +data.list[i].temp.min + "&deg;C </td>";
                        table += "<td>" +data.list[i].temp.max + "&deg;C </td>";
                        
                                            
                        table += "</tr>";
                    }
                    
                        $("#forecastWeather").html(table);
                    
                                
                        $("#city").val('');
                    
                        var temperatureMin = data.list[1].temp.min +"&deg;C";   
                        var temperatureMax = data.list[1].temp.max +"&deg;C";
                    
                        $("#temperatureMin").html(temperatureMin)
                        $("#temperatureMax").html(temperatureMax)
                }
            
            
            
            
        });
        
        
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>")
    }
    
}




/*----

def 'convertTime converts from Unix time to java.util.Date'() {
        given:
        Calendar cal = Calendar.instance
        cal.set(1992, Calendar.MAY, 5)
        Date d = cal.time
        long time = d.time / 1000  // Java time in ms, Unix time in sec
 
        when:
        Date date = model.convertTime(time)
 
        then:
        d - date < 1
        
        def 'convertSpeed converts from meters/sec to miles/hour'() {
        expect:
        (2.23694 - model.convertSpeed(1)).abs() < 0.00001
    }
    ------*/