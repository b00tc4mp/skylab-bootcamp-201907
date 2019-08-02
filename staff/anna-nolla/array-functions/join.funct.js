console.log("\n" + "Function demo join()");

function join(arr, separador){
    count = "";

    if(!(arr instanceof Array)) {
        throw TypeError("This is not an array");
    }
    if (separador === undefined){
        separador = ",";
    }
    
    for(i = 0; i < arr.length; i++){
        if(arr[i] === null || arr[i] === undefined){
            arr[i] = " ";
        }

        if(i === (arr.length -1)){
            count += arr[i];
        }
        else{
            count += arr[i] + separador;
        }
    }

    return (count);
}
