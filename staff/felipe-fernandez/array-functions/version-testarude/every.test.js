suite('every', function (){

    test('check if the value passed is the same of all the items of an array', function(){

        var array = ['a', 'a', 'a'];
     
        var result = every(array, function(val){
            return val === 'a';
        });

        check(result, true);

    });


    test('check if the value passed is the same of all the items of an array', function(){

   
        var array2 = ['1', '2', '3'];     
        
        var result2 = every(array2, function(val){
            return val === '1';
        });
        
        check(result2, false);

    });

    test('check if the value passed is the same of all the items of an array', function(){

        
        var array3 = ['3', '3', '3'];
        
        var result3 = every(array3, function(val){
            return val === '3';
        });

        check(result3, true);



    });



    test('no arguments', function (){
        every();
    }, function (error){
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function every');

    });

    test('not an array', function () {
        every(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });




});


