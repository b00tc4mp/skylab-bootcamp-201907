suite('filter' , function(){
    var numbersArray = [10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90 , 100];
    test('find first' , function(){
            var result = find(numbersArray, function(value){
            return value < 40;
        });
        check(result , [10,20,30]);
    });
});



