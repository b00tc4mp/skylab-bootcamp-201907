console.log("FIND DEMO");


var array1 = [5, 12, 8, 130, 44];

console.log(array1, " these are the initial values");

var found = array1.find(function(element) {
    return element > 10;
  });

check(found,12);

