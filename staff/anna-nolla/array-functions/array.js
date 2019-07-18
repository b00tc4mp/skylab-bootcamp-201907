
/* Array .concat() */
console.log(".Concat()");

// Sirve para juntar 2 arrays.
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];

// Juntamos el segundo array seguido del primero.
console.log(arr2.concat(arr1));

// se puede hacer con multiples arrays (siempre en el orden que quieres q salgan)
var arr3 = ["a", "b", "c"];

console.log(arr3.concat(arr1, arr2));


console.log("\n" + "Function demo");

var arrC = [];
count = 0;

function concat(...arg) {
    for (i = 0; i < arg.length; i++) {
        for (j = 0; j < arg[i].length; j++) {
            arrC += arg[i][j];
        }
    }
    arrC = arrC.split("");
    console.log(arrC);
}
concat([1, 2, 3], [4, 5, 6], ["a", "b", "c"]);



// copyWithin()

console.log("\n" + ".copyWithin()");

// Copia una parte del array dentro del mismo sin modificar su longitud
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// primer marques el target, i despres el inici i final del q vols copiar
console.log(arr1.copyWithin(5, 0, 4));

/* expected behavior es q salga a partir del 5 los 4 primeros num.
[1, 2, 3, 4, 5, 1, 2, 3, 4]*/

console.log("\n" + "Function demo");

count = 0;
arr2 = [];

function copyWithin(tar, start, end) {
    for (i = start; i < end; i++) {
        arr2[count] = arr1[i];
        count++;
    }
    for (var i = 0; i < arr2.length; i++) {
        arr1[tar] = arr2[i];
        tar++;
    }
    console.log(arr1);
}
copyWithin(5, 0, 4);


// every()
console.log("\n" + ".every()");

// pasa un test a tots els elements d'un array (torna boolean)
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// auria de tornar true
console.log(arr1.every(x => x < 10));
// auria de tornar false
console.log(arr1.every(x => x < 5));

console.log("\n" + "Function demo");

var si = true;
var no = false;
count = 0;

function every(arg) {
    for (i = 0; i < arr1.length; i++) {
        if (arr1[i] < arg) {
            count++;
        }
    }
    if(count == arr1.length){
        console.log(si);
    }
    else{ console.log(no) };
}
every(5);


// for each()
console.log("\n" + "forEach()");

var arr1 = [1, 2, 3];

// expected: un elemento por linea.
 /* forEach(arr1, function (element){
    console.log(element);
}); */

/* console.log("\n" + "Function demo");

function forEach(arr, expression) {
    for (i = 0; i < arr.length; i++) {
       console.log(expression(arr[i]));
    }
}
forEach([1,2,3], 3);*/

// .map()
console.log("\n" + "unshift()");

var array1 = [3, 4, 5];

console.log(array1.unshift(1, 2));
// expected output: [1,2,3,4,5];

console.log(array1);




console.log("\n" + "map()");

var arr1 = [1, 2, 3, 4, 5];
var coef = 10;

var result = map(arr1, function(value, index, array){
    return value * coef + "-" + index + "-" + array;
});
console.log(result);

function mapB(arr, expression){
    var result = [];

    for(i = 0; i < arr.length; i++){
        result[i] = expression(arr[i]);
    }
    return result;
}
mapB(arr1, coef);


// te saca el valor de cada elemento del array 

console.log("\n" + "values()");

var arr1 = [1, 2, 3, 4, 5];
var result = 0; 
var arr2 = arr1.values();

for( value of arr2 ){
    return value;
}

console.log(result, [1, 2, 3, 4, 5]);




// añade elementos al inicio del array y devuelve el mismo array 


console.log("\n" + "unshift()");

var array1 = [3, 4, 5];

console.log(array1.unshift(1, 2));
// expected output: [1,2,3,4,5];

console.log(array1);








