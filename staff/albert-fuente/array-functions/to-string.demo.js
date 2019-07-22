suite('toString', function(){
    var array = [1, 2, 3];
    var array1 = [6, 'bb', 'pepe', 6];
    var array2 = [6, 'bb', 'pepe', 6, [4, 'diez', 33]];

    test ('default behavior, number data type example', function(){
        var result = toStringo(array);
        check(result, "1,2,3");
    })

    test ('several data types, except another array', function(){
        result2 = toStringo(array1);
        check(result2, "6,bb,pepe,6");
    })

    test ('several data types and an array', function(){
        result3 = toStringo(array2);
        check(result3, "6,bb,pepe,6,4,diez,33");
    });

    test ('undefined as parameter', function (){ toStringo(undefined); }, function(error) {
        check(error instanceof TypeError, true);
        // console.error(error.message);
    })

    test ('null as parameter', function(){ toStringo(null); }, function(error){
        check(error instanceof TypeError, true);
    })

})
