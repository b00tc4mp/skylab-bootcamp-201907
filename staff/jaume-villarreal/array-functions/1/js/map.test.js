suite('map' , function(){



    test('all array items are multiplied * 2' , function(){
        var numbersArray = [1,2,[1,2,3],4,5];
        var result = map(numbersArray , function(value){
            return value*2;
        });
        checkArrays(result , [2,4,6,8,10]);
    });

    // test ('all array items become uppercase items' , function(){
    //     var wordsArray = ['hello' , 'world'];
    //     var result = map(wordsArray , function(value){
    //         return value.toUpperCase();
    //     })
    //     checkArrays(result , ['HELLO' , 'WORLD'])
    // })



})