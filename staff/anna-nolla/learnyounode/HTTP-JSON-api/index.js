const http = require("http")
let url = require("url")


function parsetime (time) { 
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds() 
    }
}

function unixTime (time){
    return{
        unixtime: time.getTime()
    }
}

let server = http.createServer((req, res)=>{
    if(req.method === "GET"){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        url = url.parse(req.url, true)
        res.end(JSON.stringify(parserTime(url)))

    } else {
        res.writeHead(405)
        res.end()
    }

})
server.listen(process.argv[2])

function parserTime(url){
    switch(url.pathname){
        case "/api/parsetime":
            return parsetime(new Date(url.query.iso))
        case "/api/unixtime":
            return unixTime(new Date(url.query.iso))
        default: return "nops"
    }
}

