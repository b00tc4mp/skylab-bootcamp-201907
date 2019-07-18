suite('map' , function(){
    test('all array items are multiplied * 2' , function(){
        var numbersArray = [1,2,3,4,5];
        var result = map(numbersArray , function(value){
            return value*2;
        });
        checkArrays(result , [2,4,6,8,10]);
    });
    
    test('all array items are multiplied * 2 && one item is an array' , function(){
        var numbersArray = [1,2,[1,2,3],4,5];
        var result = map(numbersArray , function(value){
            return value*2;
        });
        checkArrays(result , [2,4,NaN,8,10]);
    });

    test ('all array items become uppercase items' , function(){
        var wordsArray = ['hello' , 'world'];
        var result = map(wordsArray , function(value){
            return value.toUpperCase();
        })
        checkArrays(result , ['HELLO' , 'WORLD'])
    })

    test('checks if any item is a number or a string => returns a boolean items array' , function(){
        var itemsArray = [1,2,3,'hello',4,'world',5];
        var result = map(itemsArray , function(item){
            return (typeof item === "number");
        })
    });

    //WRONG CASES
    test('no arguments' , function(){
        map();
    },
    function(error){
        check(error instanceof TypeError , true);
        check(error.message , 'no declared arguments');
    });

    test('not array' , function(){
        map(1);
    },
    function(error){
        check(error instanceof TypeError , true);
        check(error.message , 'expected array');
    })

    test('not function' , function(){
        map([1,2,3]);
    },
    function(error){
        check(error instanceof TypeError , true);
        check(error.message , 'expected function');
    })
})