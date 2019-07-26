function call(url , expression){
    var request = new XMLHttpRequest();
    
    request.open('get' , url);
    request.onload = function(){
        var result = JSON.parse(request.responseText);
        expression(result);
    }
    
    request.send();
}