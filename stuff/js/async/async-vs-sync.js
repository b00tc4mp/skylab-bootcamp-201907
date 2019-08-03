var timeout = setTimeout(function() { console.log('hola mundo'); }, 3000);
//clearTimeout(timeout);

var before = Date.now();
while(Date.now() - before < 4000);
//console.log('hola mundo');


console.log('continuar');