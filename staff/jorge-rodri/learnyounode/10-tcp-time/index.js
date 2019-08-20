const net = require("net");
const portNumber = process.argv[2]
const server = net.createServer((socket) => {
    socket.end(getFormattedDate() + "\n");
})
server.listen(portNumber)

function getFormattedDate() {
    let today = new Date();
    return [today.getFullYear(), formatNumber(today.getMonth() + 1), formatNumber(today.getDate())].join("-")
        + " " +
        [formatNumber(today.getHours()),
        formatNumber(today.getMinutes())].join(":");
}
function formatNumber(number) {
    return number < 10 ? "0" + number : number;
}