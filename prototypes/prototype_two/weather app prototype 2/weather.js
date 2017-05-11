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
                       var widget = showResults(data)                
                    
                    $("#showWeather").html(widget);
                    
                    $("#city").val('');
                }
        });
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>")
    }
    
}

function showResults(data){
    return '<h3>Current Weather for '+data.name+', '+data.sys.country+'</h3>'+
            "<img src=  'http://openweathermap.org/img/w/"+data.weather[0].icon+".png'>"+
            "<p>Weather: "+data.weather[0].main+"</p>"+
            "<p>Weather Description: "+data.weather[0].description+"</p>"+
            "<p>Temperature: "+data.main.temp+" &deg;C</p>"+
            "<p>Min Temperature: "+data.main.temp_min+" &deg;C</p>"+
            "<p>Max Temperature: "+data.main.temp_max+" &deg;C</p>"+
            "<p>Wind Speed: "+data.wind.speed+"m/s</p>"+
            "<p>Sunrise: "+data.sys.sunrise+" </p>"+
            "<p>Sunset: "+data.sys.sunset+" </p>"+
            "<p>Clouds: "+data.clouds.all+"%</p>";
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