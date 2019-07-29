 call = (url, expression) => {
    const request = new XMLHttpRequest()

    request.open('get', url)

    request.onload = () => {
        const results = JSON.parse(request.responseText)

        expression(results)
    }

    request.send()
}