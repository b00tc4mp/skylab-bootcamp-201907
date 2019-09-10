const http = require('http')
let count = 1
const urls = process.argv.slice(2)
let responses = new Array(urls.length).fill("")
urls.forEach((url,index) =>{
http.get(url, response => {
    response.setEncoding('utf8')
    response.on('data', data => {
        responses[index] += data
    })
    response.on('end', () => {        
        if(count === urls.length){
            responses.forEach(res => { console.log(res)})
        } else count++
    })
})
})


/**
 * TRABAJA EN PARALELO
 * 
 * const http=require("http")
 * count=1
 * const{argv:[,,..urls]}=process 
 * 
 * const responses=new Array(urls.length).fill("")
 * 
 * urls.forEach((url,index)=>{
 * http.get(url,response=>{
 *  response.setEncoding("utf8")
 *  response.on("error",error=>{throw error})
 *  response.on("data",chunk=>responses[index]+=chunk)
 *  response.on("end"()=>{
 *      if(count==urls.length)
 *          responses.forEach(content=>console.log(content.length,content))
 *      else count++
 *  
 * })
 * 
 * 
 *   
 * 
 * })
 * 
 * })
 * 
 * TRANSFORMAR PARA QUE TRABAJE EN SERIE 
 * const{argv:[,,..urls]}=process
 * recursiveGetAndPrint(urls)
 * 
 * 
 * function recursiveGetAndPrint(urls){
 *  if(urls.length>0)
 *  getAndPrint(urls[0], ()=>recursiveGetAndPrint(urls.slice(1)))
 * }
 * function getAndPrint(url){
 * 
 * let conent=""
 * 
 * const request=http.get(url,response=>{
 * response.setEncoding("utf8")
 * response.on("error",error={throw error})
 * response.on("data", chunk=>content+=chunk)
 * response.on("end", ()=>{
 * console.log(content)
 * done()
 * 
 * })  
 * })
 * 
 * 
 * }
 * 
 */