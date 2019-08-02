var array = ['verde', 'rojo', 'amarillo'];

//puedo scar index contando a inversa, pero how to calculate in reverse mode??, mentira... funciona bien pero no se porque...
function test(index) {
    for(var i = array.length; i >=0 ; i--){
        if(array[i] === index){
            console.log([i]);
            break;
        }
    }
}