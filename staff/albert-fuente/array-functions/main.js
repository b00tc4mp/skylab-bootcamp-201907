/*primera vesion 1997 , ECMA committe desde 2008 ecma4 y en 2015 ecma5, la version obliqua es version 5*/
/*MDN , core JS tiene un nuclio, BOM , API serie de funciones a traves que el usuario las utilizara, la documentación explica como usar las llamadas de
las funciones. BOM funciones que se pueden usar para acceder al browser. acceder y modificar las propiedades de las ventanas del propio navegador.
window, document, nagvigator, navigator.userAgent
location, donde estoy situao, history.back manejamos la historia de la navegación. el BOM no permite ver archivos
el BOM permite entrar en el DOM otra api dentro de la api DOM
DOM representa los elementos de la pagina en JS , permite hacer traverse buscar elemento
IP: pasa por un name server, servidor de dominios, tiene un mapa de nombre vs IP , terminal ping google.es 172.217.35435.435..... puedes acceder con la IP
traceroute google.es primero para llegar a google paso por vodafone y luego paso entre muchos nodos pora llegar a internete y llegar a google.es
h1.parentElement.removeChild(h1)=>para remover un elemento
var h1s.=h1s[0]
h1.addEventListener("click", function(){
alert("hola")
})
h1.onclick=function(){
confirm("holamundo");
}
h1.removeEventListener("click",function(){...})

BUBBLING
div2.onclick=function(event){
  event.stopPropagation()
}
event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
this – is the “current” element, the one that has a currently running handler on it.
this (=event.currentTarget) is the <form> element, because the handler runs on it.
event.target is the concrete element inside the form that actually was clicked.

DEBUGGER:
div1.onclick=function(event){
debugger => el inspector de google se para puedes mirar con EVENT cual fue el event.
event.stopPropagation puedo evitar que se siga propagando el evento
el navegador por defecto detecta un click en la ventana , por defecto es bubbling
console.log("!")
}
div.addEventListener("click", function(event){
doncosole.log("1")
})

CAPTURING=> quan fas click respon en capturing de window a dins
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
There are two possible values of the capture option:

If it’s false (default), then the handler is set on the bubbling phase.
If it’s true, then the handler is set on the capturing phase.

EVENT.TARGET.ID



VARIABLES primitivos y no primitivos

undefined, null, value

primitivos: booleano, string, number, null, undefined  ES IMUTABLE

numero, cadena de texto, array, booleano

OPERATORS

Arithmetic Operators +-/*
Comparison Operators == ><
Logical Operators && || !
Assignment Operators =
Conditional Operators


*/


var o={x:1}
delete o.x;
/*solo puedes cargarte propiedades que no estan en global*/

console.log(o);
/*window es un objeto global donde ponemos todas las variables, console es
un objeto, console.log es un metodo function(argumento)*/

window.console;

/*typeof*/
var o={}
console.log(typeof o);

/*null undefined no pots cambiar son primitius, pero el typof de null
es objecte*/

console.log(o instanceof Function);
console.log(o instanceof Date);


/*el operador new crea una nueva instancia del tipo de objeto*/

a=[];

console.log(a instanceof Object, a instanceof Date, a instanceof Array);

f=function (){}
f=new function(){}

/*operadores*/
console.log(3>>2);
console.log(3<<2);

/*nomes podem emmagatzamar 3 o 0 volts*/

console.log(1|2); /*suma binaria*/
console.log(8|7);
console.log(2&2); /*multiplicacion binaria*/


if (Math.random()>0.5) console.log("ok");


var age=0;
switch(true){
    case age <=1:
        console.log("baby");
        break;
    case age>1 && age<5:
        console.log("churumbel");
        break;
    case age>5 && age<13:
        console.log("youtuber");
        break;
}
/*el case ponemos el matching con switch(true)*/

var n=[1,2,3];
var result=0;
var i=0;
while(i<n.length){
    result += n[i];
    i++;
}
console.log(result);


var n=[1]
var result=0
var i=0
while(i<n.length)result +=n[i++]
console.log(result)

/*do while entra y luego evalua, siempre evalua una vez
evaluar formulario
*/

var result=""
do{
    result=prompt("password")
}while(
    !result.trim())

"a    ".trim()
"    b".trim()
