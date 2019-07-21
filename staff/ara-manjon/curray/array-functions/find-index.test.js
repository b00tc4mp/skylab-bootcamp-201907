console.log('TEST: findIndex');

 var array1 = ['elephant', 'bird', 'dog','gorilla'];
console.log('array1', array1);

function smallWord(currentValue) {
    return currentValue.length < 4;
}
console.log('condition function', smallWord);

console.log('findIndex');
var result= (findIndex(array1,smallWord));
console.log(result, '2') 
 

  var nuevo='fahahf';
 function smallWord(currentValue) {
    return currentValue.length < 4;
}
var result=(findIndex(nuevo,smallWord))
 try{
     findIndex();
 }catch(error){
     check(error instanceof TypeError,true);

 }



 var nuevo= ['elephant', 'bird', 'dog','gorilla'];

var result=(findIndex(nuevo,'x'))
 try{
     findIndex();
 }catch(error){
     check(error instanceof TypeError,true);
 }


/*   var nuevo=[('dasjhdkjahd','ghfsjh')];
 function smallWord(currentValue) {
    return currentValue.length < 4;
}
var result=(findIndex(nuevo,smallWord))
 try{
     findIndex();
 }catch(error){
     check(error instanceof TypeError,true);
 }  */