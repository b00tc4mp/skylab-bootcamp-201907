// The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. 

function some(array, value){

    for (let i=0; i< array.length; i++){

        if (array[i] === value){
            console.log(true);
            break
        }
        if (array[i] !== value){
            console.log(false);
            break
        }
    }
} 