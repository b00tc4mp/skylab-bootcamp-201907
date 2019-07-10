//a) Puedes contar cuantas letras tiene tu nombre?
let name="Jorge";
console.log(name);
//b) Añade tu apellido e indica en qué posición del string empieza (prueba a buscar el 
//espacio entre el nombre y el apellido):
let myName="Jorge Rodriguez";
let star=myName.indexOf(" ");
console.log("My surname start in "+star+" position.");
//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo
//que haya antes del espacio):
let myName="Mariel Sanchez";
myName.substring(0,myName.indexOf(" "));
//d) Ahora, solo tu apellido.
let myName="Mariel Sanchez";
//myName.substring(myName.indexOf(" ")+1);
myName.slice(myName.indexOf("S"));
//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.
let myName="Mariel Sanchez";
let surname=myName.slice(myName.indexOf("S"));
console.log(surname)
//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.
let myName="Mariel Sanchez";
console.log(myName);
let aux="Mr/Ms"+ myName.substring(myName.indexOf(" "));
myName=aux;
console.log(myName);
//f) Selecciona tu apellido y transfórmalo a mayúsculas.
let myName="Mariel Sanchez";
(myName.substring(myName.indexOf(" "))).toLocaleUpperCase();
//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.
let name1="Jorge";
let name2="Mariel";
name1=name1.concat(" y "+name2+" son novios.")
console.log(name1);
//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?
let myName="Jorge Rodriguez";
//console.log(myName.substring(0,1)+"."+myName.substring(myName.indexOf(" ")+1,myName.indexOf(" ")+2)+".");
console.log(myName.charAt(0)+"."+myName.charAt(myName.indexOf(" ")+1)+".");