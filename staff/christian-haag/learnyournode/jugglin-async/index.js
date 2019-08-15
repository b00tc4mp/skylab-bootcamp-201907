
const http = require('http')
let count = 1
const urls = process.argv.slice(2)

//set array to store urls Data
let responses = new Array(urls.length).fill("")

urls.forEach((url, index) => {
    //response is the data we get from the server. We receive the data in chunks which we collect with de response.on event
    http.get(url, response => {
        response.setEncoding('utf8')
        //awaits an event. When event starts the callback is fired
        response.on('data', data => {
            responses[index] += data
        })
        //when there is no more data to process a callback is fired with a condition, when the consition is true a second callback is fired. 
        response.on('end', () => {
            if (count === urls.length) {
                responses.forEach(res => { console.log(res) })
            } else count++
        })
    })
})










