
suite( 'push', function(){

    test ( "push a string 'a' at the end of the array", function(){
        var array = [1,2,3];
        var result = array.push();
        checkArrays = (result, [1,2,3,'a'])
    } )
    test ("push a string 'b' at the end of the array", function(){
        var array = [1,2,3,'a'];
        var result = array.push();
        checkArrays = (result, [1,2,3,'a','b'])

    } )
    test ('not an array', function(){
        push('array');      
    }, function (error){
        check(error instanceof TypeError, true);
        check(error.message , 'array is not an array');
    });


}
    
)

// var array = [1, 2, 3];

// var result = push(array, 'a');
// check(result, 4);
// check(array, [1, 2, 3, 'a']); 

// result = push(array, 'b');
// check(result, 5);
// check(array, [1, 2, 3, 'a', 'b']);