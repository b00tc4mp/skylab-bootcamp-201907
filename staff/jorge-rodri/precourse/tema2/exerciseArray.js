//a) Declara tu nombre completo en un array y muéstralo por pantalla separando cada letra por /
let name=["J","o","r","g","e","R","o","d","r","i","g","u","e","z"]
console.log(name.join("/"));
//b) Ahora solo selecciona tu apellido y muestra cada letra separada por |
let name=["J","o","r","g","e","R","o","d","r","i","g","u","e","z"]
console.log((name.slice(name.indexOf("R")).join("|")));
//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un for)
let name=["J","o","r","g","e"];
let namePos="";
for(let i=0; i<name.length;i++){
    namePos+=(i+1)+"º "+name[i]+", "
}
console.log(namePos.slice(0,-2));
//d) Como en el ejercicio anterior, pero seleccionando tu apellido
let name=["J","o","r","g","e","R","o","d","r","i","g","u","e","z"];
surname=name.slice(name.indexOf("R"));
let namePos="";
console.log(name);
for(let i=0;i<surname.length;i++){
    namePos+=(i+1)+"º"+surname[i]+", ";
}
console.log(namePos.slice(0,-2));
//e) Puedes indicarme las iniciales de tu nombre y apellido? ç
//Como en el ejercicio h de la sección de String
let name=["J","o","r","g","e","R","o","d","r","i","g","u","e","z"];
let initials=name[name.indexOf("J")]+", "+name[name.indexOf("R")]
console.log(initials);
//f) Ahora, reformula la array, introduciendo tu nombre en primera posición,
//tu apellido en segunda, y además añade en otra posición tu edad. 
//Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.
let date=["Jorge","Rodriguez",28];
console.log(`My name is ${date[0]} and my age is ${date[2]}`);
//g) Prepara una function() para añadir tu City al array, muestra un 
//mensaje mostrando el contenido de toda el array, así aseguraremos los cambios.
function myCityAdd(arr){
    let city=prompt("Introduce your city: ");
    arr.push(city);
}
let date=["Jorge","Rodriguez",28];
myCityAdd(date);
console.log(date);
//h) Crea ahora, una function() para eliminar la variable City y asegura los cambios.
function myCityRemove(city){
    city.pop();
}
myCityRemove(date);
console.log(date);
//j) Ahora, elimina el nombre y asegura los cambios 
function nameRemove(name){
    name.shift();
}
nameRemove(date);
console.log(date);
//k) Quiero volver a introducir mi nombre pero si lo 
//introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición?
function nameAddFirst(arr){
    let name=prompt("Introduce your name: ");
    arr.unshift(name);
}
nameAddFirst(date);
console.log(date);
//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.
let numbers=[0,1,2,3,4,5,6,7,8,9,10];
let multiByTwo=numbers.map((number)=>number*2);
console.log(multiByTwo);
//l1) Reformula la función para que puedas especificar por qué número debería multiplicar cada elemento del array.
let multiplier=prompt("Introduce the multiplier: ");
let multiByNum=numbers.map((number)=>number*multiplier);
console.log(multiByNum);
//m) Podrías mostrarlos en el orden inverso? 
multiByNum.reverse();
console.log(multiByNum);
//n) Puedes indicarme qué letras se repiten de tu nombre y cuantas veces?
let names=["T","o","n","y","S","t","a","y","r","k"];
function countLettersRep(arr){
    let pivot="";
    let normalLetter=arr.map((letter)=>letter.toLowerCase());
    for(let i=0;i<normalLetter.length;i++){
        pivot=normalLetter[i];
        let count=0;
        normalLetter.map((element)=>pivot==element?count++:null);
        if(count>1){
            normalLetter[i]=0;
            console.log(`${pivot.toUpperCase()} repeat => ${count} times.`);
        }
    }
}
countLetters(names)
//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras
let names=["T","o","n","y","S","t","a","y","r","k"];
function countLettersNoRep(arr){
    let pivot="";
    let normalLetter=arr.map((letter)=>letter.toLowerCase());
    let lettersDontRepeat=[];
    for(let i=0;i<normalLetter.length;i++){
        pivot=normalLetter[i];
        let count=0;
        normalLetter.map((element)=>pivot==element?count++:null);
        if(count==1){
            lettersDontRepeat.push(pivot);
        }
    }
    console.log(`The letters don´t repeat are: ${lettersDontRepeat.join(", ")}`)
}
countLettersNoRep(names);