console.log("FIND DEMO");


 var array1 = [5, 12, 8, 130, 44];

console.log(array1, " these are the initial values");

var found = array1.find(function(element) {
    return element > 10;
  });

check(found,12); 


/*error con array no declarada */
try{ 
   find();


}catch(error){
  check(error instanceof TypeError,true);
  check(error.message, "THIS IS THE LOG NO ARGUMENTS ");
  console.log(error.stack);
} 


try{
    find(2);
 
  }catch(error){
    check(error instanceof TypeError,true);
    check(error.message, "THIS IS THE LOG NOT ARRAY  ");
    console.log(error.stack);
  }

  try{
    find([1,2,3],3);
 
  }catch(error){
    check(error instanceof TypeError,true);
    check(error.message, "THIS IS THE LOG NOT FUNCTION  ");
    console.log(error.stack);
  }
  
