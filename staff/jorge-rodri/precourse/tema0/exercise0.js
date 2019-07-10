//a) Declara tu nombre y muéstralo por consola:
let name="Jorge"
console.log(name);
//b) Declara tu edad y muéstralo por consola:
let age=28
console.log(age)
//c) Declara tu nombre, tu apellido y tu edad 
//en un array en diferentes posiciones y muéstrala por consola:
let date=["Jorge", "Rodríguez", 28]
console.log(date)
console.log(date[0])
console.log(date[1])
console.log(date[2])
//d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:
let dateObj={
	name:"Jorge",
	age:28
}
console.log(dateObj)
//e) Ahora utiliza el array que has creado anteriormente
// para recorrerlo y mostrar una a una todas las posiciones del array.
let date=["Jorge", "Rodríguez", 28]
for(let i=0; i<date.length; i++){
	console.log(date[i])
}
// Crea una estructura condicional que imprima el número mayor entre dos números.
const a=5
const b=6
if(a>b){
	console.log(a+" is greater and "+b+" is less.")
}else{
	console.log(b+" is greater "+a+" is less")
}
//Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:
const a=6
const b=6
if(a>b){
	console.log(a+" is greater and "+b+" is less.")
}else if(a==b){
	console.log(a+" and "+b+" are equals.")
}else{
	console.log(b+" is greater "+a+" is less")
}
//g) Recorre un array de 5 números y cuando llegues a la mitad muestra el siguiente mensaje: 'We are in the middle of loop'.
let five=[0,1,2,3,4]
for(let i=0; i<five.length;i++){
	if(i==(five.length-1)/2){
		console.log("We are in the middle of loop.")
	}
}
//g1) Declara tu nombre y tu edad en dos variables y crea un condicional para, en caso de no coincidir con tus datos, mostrar un error.
const name="Jorge";
const surname="Rodríguez";
let oneName=prompt("Introduce name: ");
let oneSurname=prompt("Introduce surname: ");
if(name==oneName&&surname==oneSurname){
	console.log("There is coincidence.");
}else{
	console.log("Data error.");
}
//h) Declara tu nombre y DNI en dos variables y crea un condicional para, en caso de que coincida uno de los dos datos, muestre un mensaje.
const name="Jorge";
const dni=44744747+"h";
let oneName=prompt("Introduce name: ");
let oneDni=prompt("Introduce dni: ");
if(name==oneName||dni==oneDni){
	console.log("There is coincidence.");
}else{
	console.log("There isn´t coincidence.");
}
//i) Crea un array, introduce los datos anteriores y unos cuantos más de forma que al recorrer el array muestre un mensaje cuando encuentre tus datos.
const data=["Jorge","Mozilla",54,44744747+"h",56.256];
const name="Jorge";
const dni=44744747+"h";
let oneName=prompt("Introduce name: ");
let oneDni=prompt("Introduce dni: ");
for(let i=0;i<data.length;i++){
	if(data[i]==oneName||data[i]==oneDni){
		console.log("There is coincidence: "+data[i]);
	}	
}
//j)Crea un array de strings y recorre cada una de esos valores. Imprime cada carácter en una línea distinta.
const chain=["Jorge", "Rodríguez","Sánchez", "44744747h"];
for(let i=0;i<chain.length;i++){
	for(let j=0;j<chain[i].length;j++){
		console.log(chain[i][j]);
	}
	console.log(" ");
}
//h)Coge el mismo array de arriba y crea un algoritmo que diga si la variable pasada son iguales en tipo y contenido.
const prueba=["Jorge", 447, "447", 15.36];
let prueba1=prompt("Introduce variable 2");
for(let i=0; i<prueba.length;i++){
	if(prueba1===prueba[i]){
		console.log("La variable "+prueba1+" es igual en contenido y tipo al elemento "+i+" del array.");
	}else if(prueba1==prueba[i] && prueba1!==prueba1[i]){
		console.log("La variable "+prueba1+" es igual en contenido pero distinta en tipo al elemento "+i+" del array.");
	}
}