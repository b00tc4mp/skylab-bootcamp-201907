function call(url, expression) {
    var request = new XMLHttpRequest()

    request.open('get', url);

    request.onload = function () {
        var results = JSON.parse(request.responseText);

        expression(results);
    };

    request.send();
}