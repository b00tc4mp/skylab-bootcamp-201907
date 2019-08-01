suite('find' , function(){
    var numbersArray = [10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90 , 100];
    test('find first number maior 20' , function(){
            var result = find(numbersArray, function(value){
            return value > 20;
        });
        check(result , 30);
    });
    
    test('find first number minor 80' , function(){
            var result = find(numbersArray, function(value){
            return value < 80;
        });
        check(result , 10);
    });
    
    test('no arguments' , function(){
            find()
        }, function(error){
            check(error instanceof TypeError , true);
            check(error.message , "no declared arguments");
        });

    
    test('not an array' , function(){
            find(2);
        } , function(error){
        check(error instanceof TypeError , true);
        check(error.message , '2 is not an array');
    });

    test('not a function' , function(){
        find(numbersArray , false);
    }, function(error){
        check(error instanceof TypeError , true);
        check(error.message , 'false is not a function');
    })
});



