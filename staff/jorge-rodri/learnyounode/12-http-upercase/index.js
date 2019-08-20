const fs = require('fs')
const http = require('http')
const {argv: [n,p , portNumber, file]} = process
console.log(n, "--",p,"--",portNumber,file)