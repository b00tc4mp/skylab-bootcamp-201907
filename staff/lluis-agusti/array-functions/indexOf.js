function indexOf(index) {
    var array = ['verde', 'rojo', 'amarillo'];
    for(var i = 0; i <= array.length; i++){
        if(array[i] === index){
            console.log([i]);
            break;
        }
    }
}