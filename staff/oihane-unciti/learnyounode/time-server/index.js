var net = require("net")
var data = process.argv[2]

function now(){

    var d = new Date(year, month, day, hour, minute);
}


var server = net.createServer(socket => {
     const date = new Date
     const formatted= strftime("%Y--%m--%d %H:%M", date)

     socket.end(formatted)
   /*  socket.on('data', data => {
        var string = (data.toString());
        console.log(string)
    });

    socket.end(now() + '\n') */
})
server.listen()




/* var datetime = new Date();
console.log(datetime); */