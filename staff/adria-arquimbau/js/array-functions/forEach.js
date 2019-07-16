function forEach(array, expression){
    for (let i = 0; i < array.length; i++)
        expression(array[i]);
}