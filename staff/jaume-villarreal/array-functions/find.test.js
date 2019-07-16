console.log('TEST: find')

var numbersArray = [10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90 , 100];

// var result1 = find(numbersArray , function(value){
//     return value > 20;
// });
// check(result1 , 30);

// var result2 = find(numbersArray , function(value){
//     return value < 70;
// });
// check(result2 , 10);

try {
    var result1 = find('hola' , function(value){
        return value > 20;
    });
    check(result1 , 30);

    // var result2 = find(numbersArray , function(value){
    //     return value < 70;
    // });
    
    // alert('welcome');

} catch(error){
    // if(error instanceof Error)
    alert("wrong arguments");
}

