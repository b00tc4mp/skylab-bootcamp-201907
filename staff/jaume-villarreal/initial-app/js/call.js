function call(url , expression){
     var endPoint = "http://duckling-api.herokuapp.com/api/ducks/";

        var request = new XMLHttpRequest();
        
        request.open('get' , url);

        request.onload = function(){
            var result = JSON.parse(request.responseText);
            expression(result);
        }
        
        request.send();
}