function calculator () {
    function newNumbers (){
        var choice = prompt ("New numbers? y/n");
        switch (choice) {
            case 'y':
                var arr = prompt("Enter each number followed by a space").split(" ");
                for (var i=0; i<arr.length; i++) {
                    if (isNaN(arr[i]) == true) {
                        console.log(arr[i] + ' is not a number.');        
                        return newNumbers();      
                    }
                    else {
                    arr[i] = parseFloat(arr[i]);
                    }
                }                                         
                return calculator(...arr);
            case 'n':
                console.log('Bye');
                break;
        }        
    }
    if (arguments.length == 1 && typeof(arguments[0]) == 'number') {
        console.log('La raiz cuadrada de ' + arguments[0] + ' es ' + parseFloat(Math.sqrt(arguments[0]).toFixed(3)) + '.');
        return newNumbers();
        } 
    else if (arguments.length >= 2 && typeof(arguments[0]) == 'number') {
        suma=arguments[0];
        resta=arguments[0];
        multi=arguments[0];
        divi=arguments[0];
        for (var i=1; i<arguments.length; i++) {
            if (typeof(arguments[i]) != 'number') { 
                console.log(arguments[i] + ' is not a number.');
                return newNumbers();
            }   
            else {
                suma += arguments[i];
                resta -= arguments[i];
                multi *= arguments[i];
                divi /= arguments[i];
            }
        }
        console.log('Suma = ' + parseFloat(suma.toFixed(3)));
        console.log('Resta = ' + parseFloat(resta.toFixed(3)));
        console.log('Multiplicación = ' + parseFloat(multi.toFixed(3)));
        console.log('División = ' + parseFloat(divi.toFixed(3)));
        return newNumbers();
    }
    else {
        console.log(arguments[0] + ' is not a number.');
        return newNumbers();
    }
}