function call(url, expression) {
    let request = new XMLHttpRequest()

    request.open('get', url);

    request.onload = function () {
        let results = JSON.parse(request.responseText);

        expression(results);
    };

    request.send();
}