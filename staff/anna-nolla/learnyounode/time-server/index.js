var net = require("net")
var ser = process.argv[2]


var server = net.createServer (function (socket){
    var date = new Date();
    var output = date.getFullYear() + "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("0" + date.getDate()).slice(-2) + " " +
    date.getHours() + ":" +
    ("0" + date.getMinutes()).slice(-2) + "\n"
    socket.end(output)
})
server.listen(ser)