const http = require('http')
const bl = require('bl')    //requires buffer list module => buffer list collector, it doesn't need keyword ¡new when constructor is invoqued

const { argv : [ , , url] } = process
http.get(url , response => {
   response.pipe( bl ((error , data) => {
/*        el response es readstream y bl es writestream
 */           data = data.toString()
           if(error) throw error
           console.log(data.length)
           console.log(data)
       })
   )
}).on('error' , error => {throw error})


/**
 * imprimir numero de caracteres y luego el contenido
 * 
 * const http=require("http")
 * const request=http.get(process.argv[2],response=>{
 *      response.setEncoding("utf8")
 *      response.on("error",error=>{throw error})
 *      let content= ""
 *      response.on("data", chunk=>content+=chunk) xurros de data cada chunk es una palabra
 *      response.on("end", ()=>console.log(content.lenght,content))
 * 
 * }).on("error",error=>{throw error})
 * 
 * 
 * node . http://downloads.gos.......  to test
 * 
 *      PER CONTAR CHUNKS
 *      let count=0
 *      response.on("data" chunk=>count++)
 *      response.on("end", ()=> console.log(count))
 *      el protocolo garantiza que si hay un error de chunks va a llegar de nuevo
 *      en las cabecereas te envian el tamaño 10mb te envio chunks de 1kb y calculas porcentage 
 * 
 * 
 * COPIAR fichero de un lugar a otro 
 * const fs=require("fs")
 *      //node . from-file-paht to-file-path
 * const{argv:[,,from,to]}=process
 * fs.readFile(from, "utf8",(error,data)=>{
 *  if(error)throw error 
 *  fs.writeFile(to,data,error=> {if(error)throw error})
 * })
 * 
 * PIPING forma mas optima de copiar
 *  STREAMS COPIAR fichero de un lugar a otro 
 * const fs=require("fs")
 *      //node . from-file-path to-file-path
 * const{argv:[,,from,to]}=process
 * const rs= fs.createReadStream(from)
 * const ws=fs.createWriteStream(to)
 * 
 * rs.pipe(ws)
 * 
 * 
 * 
 * 
 * 
 * ASYNC EN PARALELO
 * / node index-async.js http://google.it http://google.es http://google.fr http://google.ro http://google.de http://google.be
 * const http=require("http")
 * const async=require("async")
 * 
 * const{argv:[,,...urls]}=process
 * 
 * async.map(urls,(url,calback)=>{
 *  let content=""
 *  const request=http.get(url,response=>{
 *  response.setEncoding("utf8")
 * response.on("error",error=>callback(error))
 *  response.on("data", chunk=>content+=chunk)
 *  response.on("end", ()=>callback(content))
 * 
 * })
 * request.on("error",error=>callback(error))
 * },(error,contents)=>{
 *  if(error) throw error
 *  contents.forEach(content=>console.log(content))
 * })
 * 
 */