do{
	let numero1 = prompt ( 'introduce el primer número')
	num1 = parseFloat(numero1)
	if (isNaN(num1)){
	alert('Tienes que introducir un número')
	num1 = ""
	}
}while(typeof num1 != 'number')
let num2 = ""
do{
	let numero2 = prompt ( 'introduce el segundo número')
	if(numero2 === "") {
		break
	}
	num2 = parseFloat(numero2)
		if (isNaN(num2)){
		alert('Tienes que introducir un número')
		num2 = ""
		}
	
}while(typeof num2 != 'number')

function decimales(n){
  if(Number.isInteger(n)){
  	return n}
  else {
  	return n.toFixed(3)}

}
function suma(num1,num2){
    let sum = num1+num2;
  return decimales(sum)
}
function resta(num1,num2){
    let resta = num1-num2;
  return decimales(resta)
}
function div(num1,num2){
    let dividir = num1/num2;
  return decimales(dividir)
}
function mult(num1,num2){
  let multip = num1*num2;
  return decimales(multip)
}

function raiz(num2){
		let sqrt = Math.sqrt(num2)
		return decimales(sqrt)
	} 

if(num2 ==  "" ){
console.log(`Como solo hay un número, te doy la raiz cuadrada, que es: ${raiz(num1)} `)
}
else{
	alert(`Tús numeros son : ${num1} y ${num2}, sumados dan : ${suma(num1,num2)} . Si los restas da : ${resta(num1,num2)}, multiplicados: ${mult(num1,num2)} y dividios: ${div(num1,num2)}`)
	
}
let sumaPro = suma(num1,num2)
let restaPro = resta(num1,num2)
let multPro = mult(num1,num2)
let divPro = div(num1,num2)
function seguirF (){
	let seguir = prompt( 'seguir? si/no')
	if (seguir === 'si'){
		do{
	let numeroN = prompt ( 'introduce otro número')
	numN = parseFloat(numeroN)
	break
	if (isNaN(numN)){
	alert('Tienes que introducir un número')
	numN = ""

	}
	else{
		break}
}while(typeof numN != 'number')
	return numN
	operaciones()
	}
	else {
		alert('Adiós')
	}
}

function operaciones (){
do{


	sumaPro = sumaPro + numN
 	restaPro = restaPro - numN
 	multPro = multPro * numN
 	divPro = divPro / numN
 	
 	alert (`La suma es ${decimales(sumaPro)}, la resta ${decimales(restaPro)}, la mult ${decimales(multPro)} y la div ${decimales(divPro)}`)}
while(seguirF())
 }
seguirF()
operaciones()
