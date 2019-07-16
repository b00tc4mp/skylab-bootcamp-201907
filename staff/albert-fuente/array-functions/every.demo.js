<<<<<<< Updated upstream
console.log("EVERY DEMO xxxxxxxxxxxxxxx")

=======
console.log("EVERY DEMO")

function biggerThan(currentValue){
    return currentValue>40
}
>>>>>>> Stashed changes

var array1 = [1, 30, 39, 29, 10, 13];
console.log(array1, " initial values have to be less than 40")

<<<<<<< Updated upstream
console.log(every(array1));
=======
console.log(every(array1,biggerThan));
>>>>>>> Stashed changes

var array2 = [1, 30, 39, 2, 10, 45];
console.log(array2, " initial values have to be less than 40")

<<<<<<< Updated upstream
console.log(every(array2));
=======
console.log(every(array2, biggerThan));
>>>>>>> Stashed changes
