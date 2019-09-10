
var net = require("net");
var portNumber = process.argv[2]
var server = net.createServer(function (socket) {
    socket.end(getFormattedDate() + "\n");
})
server.listen(portNumber)
function getFormattedDate() {
    var today = new Date();
    return [today.getFullYear(), formatNumber(today.getMonth() + 1), formatNumber(today.getDate())].join("-")
        + " " +
        [formatNumber(today.getHours()),
        formatNumber(today.getMinutes())].join(":");
}
function formatNumber(number) {
    return number < 10 ? "0" + number : number;
}






/**
 * montar un servidor tcp de bajo nivel para mostar la hora
 * el socket es la conexion la maquina que se ha conectado a mi 
 * 
 * const net=require("net")
 * 
 * const server=net.createServer(socket=>{
 * 
 *  socket.end("hola mundo")
 * no es un mensaje http 
 * 
 * http response demo:
 *  socket.end("HTTP/1.1 200 OK
 * Content-Type:text/html
 * HOla,Mundo!")
 * 
 * })
 * 
 * server.listen(8000)
 * 
 * 
 * 
 * 
 * SOLUCION AMB STRFTIME
 * const net=require("net")
 * const strftime=rquire("strftime")
 * const server=net.createServer(socket=>{
 *  const date=new Date()
 *  const formatted=strftime("%Y-%m-%d %H:%M/n",date)
 * 
 *  socket.end(formatted)
 * })
 * server.listen(8080)
 * 
 * 
 * TCP CONNECT
 */

