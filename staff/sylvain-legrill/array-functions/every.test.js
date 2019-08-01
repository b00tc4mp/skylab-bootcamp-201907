suite('every', function(){
    var array = [1,2,3]

    test('test if value 4 in array', function(){
        var result = array.every(x => x = 4);
        checkArrays = (result, false)

    })

    test('test if value 3 in array', function(){
        var result = array.every(x => x = 3);
        checkArrays = (result, true)

    })

    test ('string as an array', function(){
        every('array');      
    }, function (error){
        check(error instanceof TypeError, true);
        check(error.message , 'array is not an array');
    });
    
} )