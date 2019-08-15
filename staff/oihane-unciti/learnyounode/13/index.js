const http = require('http')

const url = require('url')



const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true)

    let date = new Date(parsedUrl.query['iso']);

    let json = {}





    if (parsedUrl.pathname === '/api/parsetime'){

        json.hour = date.getHours()

        json.minute = date.getMinutes()

        json.second = date.getSeconds()





        result = JSON.stringify(json)



        res.writeHead(200, {'Content-Type': 'application/json'})

        res.end(result)

    } else if (parsedUrl.pathname === '/api/unixtime'){

        json.unixtime = date.getTime()



        result = JSON.stringify(json)



        res.writeHead(200, {'Content-Type': 'application/json'})

        res.end(result)

    }

})



server.listen(process.argv[2])