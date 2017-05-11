$(document).ready(function(){
    
    $("#submitForecast").click(function(){
        return getForecast();
    });
    
    
});

function getForecast(){
    var city =$("#city").val();
    
    if(city !=''){
        
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
                    
                        $("#forecastWeather").html(table);
                        $("#city").val('');
                }
        });
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
}