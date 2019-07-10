/////////////PRO
/*Podrías hacer que le calculadora realizara operaciones sean cuales sean el número
de argumentos pasados a la función?
Arguments MDN Reference
function sum () {
var acc = 0 ;
for (num in arguments ) {
console . log (num);
acc += arguments [num];
}*/
  /*  Después de hacer todas las operaciones, el programa deberá preguntar al usuario si desea
volver a realizar otra operación, volviendo a almacenar más resultados y mostrándolos.
calculator (n1,n2);
//Output => sum, subs, mult, div...
prompt ( "New numbers? y/n" )
Case "y" => calculator (n1,n2)
//Output => sum1, subs1, mult1, div1, sum2, subs2, mult2, div2...
Case "n" => "Bye!"*/

//////////////////////

function calculatorPRO(...theArgs){
  function sum(){
     var acc=0;
  for(num in theArgs){
    acc += parseInt(theArgs[num]);
  } return acc;
  }
  console.log('The sum of the numbers is: '+Math.round(sum()*100)/100)
  
  function rest() {
    return theArgs.reduce((previous, current) => {
      return previous - current;
    });
  }
  console.log('The rest of the numbers is: '+Math.round(rest()*100)/100);
  
  function mult() {
    return theArgs.reduce((previous, current) => {
      return previous * current;
    });
  }
  console.log('The mult of the numbers is: '+Math.round(mult()*100)/100);
  
  function div() {
    return theArgs.reduce((previous, current) => {
    return previous / current;
    });
  }
  console.log('The div of the numbers is: '+Math.round(div()*100)/100);
  }
  
  calculatorPRO(2,5)
  
  
  
  function response(){
  var response= prompt('Do you want calculate more numbers?yes/no');
  if(response != null && response=='yes'){
  
  let numbers=[];
  while (true) {
   var value = prompt("A number please?", 0);
  
      if (value === "" || value === null || !isFinite(value)) break;
  
      numbers.push(value);
    }
  
  function calculatorPRO_Response(){
    calculatorPRO(...theArgs=numbers)
  }
  calculatorPRO_Response()
  }else{
  console.log("Bye!")} 
  }
  response()