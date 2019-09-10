const http=require("http")

const url=require("url")

const{argv:[,,port]}=process


const server=http.createServer((req,res)=>{
    const {pathname,query:{iso}}=url.parse(req.url,true)
    const date=new Date(iso)

    switch(pathname){
        case "/api/parsetime":
            
            const hour=date.getHours()
            const minute=date.getMinutes()
            const second=date.getSeconds()

            //devolver en JSON
            const output={hour,minute,second}
            const json=JSON.stringify(output)
            //para devolver json tenemos que informar en las cabeceras para que se pueda interpretar 
            res.writeHead(200,{"Content-Type":"application/json"})
/*             res.writeHead(200,{"Conent-Type":"Access-Control-Allow-Origin":"*"}) problema de CORS el navegador no et deixaria sense aixo
 */            res.end(json)
            break
        case "/api/unixtime":

            const unixtime=date.getTime()

            //devolver en JSON
            const _output={unixtime}
            const json=JSON.stringify(_output)
            //para devolver json tenemos que informar en las cabeceras para que se pueda interpretar 
            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(json)

            

    }
})
server.listen(port)

/**
 * 2 endpoints 1 api parsetime
 * o nos pueden pedir en unixtime hay que cambiarlo a timestamp
 * nos envian la hora en formato iso luego hay que devolverlo en json 
 * si nos envian en unixtime hay que devolver en unixtime:timestamp 
 * 
 * recuperar la informacion desde la request
 * 
 * si testejes el navegador bloquea la resposta, si ho fas desde localhost no to bloqueja
 * hi ha unes cabeceras CORS que permeten la conexio, el servidor les envia si no veu que hi són el navegador considera que no es segur 
 * si envies un corse header despres et deixa 
 * access-control-allow-origin
 * 
 */