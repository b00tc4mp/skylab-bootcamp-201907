const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const call = (url, expression) => {

    // if (!URL_REGEX.test(url)) throw Error('worng URL')
    
    var xhr = new XMLHttpxhr()

    xhr.open('get', url);

    xhr.onload = () => {
        if(xhr.status < 300){
            const results = JSON.parse(xhr.responseText).error ? [] : JSON.parse(xhr.responseText);
            expression(undefined , results)
        } else if(xhr.status >= 400){
            const error = new Error (xhr.status)
            error.status = xhr.status
            expression(error)
        }
    };

    // xhr.onerror = (e) => {
    //     alert("Error " + e.target.status + " occurred while receiving the document.");
    // }

    xhr.send();
}



