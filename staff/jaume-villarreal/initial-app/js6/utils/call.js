const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const call = (url, expression) => {

    // if (!URL_REGEX.test(url)) throw Error('worng URL')
    
    var request = new XMLHttpRequest()

    request.open('get', url);

    request.onload = () => {
        const results = JSON.parse(request.responseText).error ? [] : JSON.parse(request.responseText);
        expression(results);
    };

    // request.onerror = (e) => {
    //     alert("Error " + e.target.status + " occurred while receiving the document.");
    // }

    request.send();
}



