

var arr1 = [1, 2, 3, ["a", "b", "c", [true, false, [undefined, null]]]];
var result = [];
// de normal treu els elements d'un array de primer nivell cap a larray principal
result = arr1.flat();
console.log(result, "[1, 2, 3, a, b, c, [true, false]]");

// saca los elementos internos del array hasta una profundida x;
result = arr1.flat (2);
console.log(result, "[1, 2, 3, a, b, c, true, false, [undefined, null]]");

result = flat (arr1, 3);
console.log(result, "[1, 2, 3, a, b, c, true, false, [undefined, null]]");

/* function flat(arr, depth){
    if(!(array instanceof arr)) throw TypeError ( array +" is not an array");

    var depth = arguments[1] || 1;
    var result = arr[i];

    for (i = 0; i < arr.length; i++){
        var element = arr[i];

        if (depth > 0 ){
            if(element instanceof arr){
                for (j = 0; j < element.length; j++){
                    var item = element[j];

                    if (depth > 1){
                        if (element instanceof element){
                            for (k= 0; k < item.length; k++);
                                result.push(item[k]);
                            }
                        else{
                            result.push(element);
                        }
                    }
                result.push(element[j]);
                }
            }
        }
        else{
            result.push(element);
        }
    }
}



function doS(value){
    if(value instanceof Array){
        for (l = 0; l < value.length; l++){

        }
    }
}*/


function flat(arr, depth){
    if(!(arr instanceof Array)) throw TypeError ( array + " is not an array");

    var depth = typeof depth === "undefined"? 1 : depth;
    var result = [];

    for (i = 0; i < arr.length; i++){
        var element = arr[i];

        if (depth > 0 ){
            if (element instanceof Array){
                var item = flat(element, depth -1);

                for (j = 0; j < item.length; j++){
                    result.push(element[j]);
                }
            }
            else { 
                result.push(element);
            }
        }
    }
}
