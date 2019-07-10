//a) Que hora es? Declara la hora como número y devuelvela como un string
let time=10.45
console.log(`It´s ${time.toString()} at morning.`)
//b) No no no, que hora exactamente? Dime la hora sin minutos!
let time=10.45
console.log(`It´s ${(Math.trunc(time)).toString()} at morning.`)
//c) Ahora, declara tu hora y muéstrala redondeada.
let time=25.31
if(time%1>0.30){
    console.log(`It´s ${Math.ceil(time).toString()} at morning.`)
}else{
    console.log(`It´s ${Math.floor(time).toString()} at morning.`)
}
//d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y sumalos.
let num1=5;
let num2=6;
let sum=print(`The result of add is ${(num1+num2).toString()}, `);
//d1) Añade la resta...
let sub=print(`the result of substraction is ${(num1-num2).toString()}, `);
//d2) La multiplicación...
let mult=print(`the result of multiply is ${(num1*num2).toString()}, `);
//d3) Y, por ultimo, la división.
let div=print(`the result of divide is ${(num1/num2).toFixed(2)}.`);
console.log(sum+sub+mult+div);
//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
let num3="5"
let letters=9;
if(typeof(num3)=='number'&&typeof(letters)=='number'){
    console.log("Okey men.")
}else{
    console.log("This date not correct men.")
}