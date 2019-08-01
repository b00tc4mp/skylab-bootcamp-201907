

call = (url, expression) =>{
    const request = new XMLHttpRequest()

    request.open('get', url)

    request.onload = () => {
        let results = JSON.parse(request.responseText)
        expression(results)
    }
    request.send()
}