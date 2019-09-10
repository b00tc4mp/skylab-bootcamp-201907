function call(url, expression) {
    const xhr = new XMLHttpRequest()

    xhr.open('get', url)

    xhr.onload = function () {
        if (xhr.status < 300) {
            const results = JSON.parse(xhr.responseText)

            expression(undefined, results)
        } else if(xhr.status >= 300) {
            const error = new Error(xhr.status)

            error.status = xhr.status

            expression(error)
        }
    }

    xhr.onerror = function(error) {
        //debugger // TODO
    }

    xhr.send()
}
