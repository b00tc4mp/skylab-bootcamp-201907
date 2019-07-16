function calculator(nums){
    
    var results = [];
    
if (nums.length > 1){
        var sum = function (nums){
            var acc = 0;
            for (num in nums){
                acc += nums[num];
            }
            return acc;
        }


        var s = sum(nums);
        results[0] = 'el resultado de la suma es ' + s.toFixed(2);

        
        var res = function (nums){
            var re = nums[0];
            for (var i = 1; i < nums.length; i++){
                re -= nums[i];
            }
            return re;
        }


        var r = res(nums);
        results[1] = 'el resultado de la resta es ' + r.toFixed(2);


        var mult = function (nums){
            var mu = nums[0];
            for(var i = 1; i < nums.length; i++){
                mu *= nums[i];
            }
            return mu;
        }


        var m = mult(nums);
        results[2] = 'el resultado de la multiplicación es ' + m.toFixed(2);
    

        var div = function (nums){
            var di = nums[0];
            for(var i = 1; i < nums.length; i++){
                di /= nums[i];
            }
            return di;
        }


        var d = div(nums);
        results[3] = 'el resultado de la división es ' + d.toFixed(2);


    } else if (nums.length == 1 && typeof nums[0] == 'number'){
        return 'La raíz cuadrada de ' + nums + ' es ' + Math.sqrt(nums);   
    }else if (nums.length > 1 && typeof nums != 'number'){      
        return 'No son números';
    } else if (nums.length == 1 && typeof nums != 'number'){
        return 'No es un número';
    } 
        
    console.log(results);

};



    var pregunta = prompt('¿Otra? s/n');
    
    switch(pregunta){
        
        case 's':
            var pideNum = prompt('Números aquí, separado por espacio:');
            var numeros = pideNum.split(" ");
            var numsArr = numeros.map(function(x){
                return Number.parseInt(x,10);
            });
            break;
        
        case 'n':
            alert('¡Adios!');
            break;
        
        default:
            alert('Error');
            break;
    }



calculator(numsArr); 
              
        









 