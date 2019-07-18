suite("reverse", function(){
    test("reverse the direction of the elements, GOOD implementation", function(){
        let array = [1, 2, 3, 4, 5]
        let expected = [5, 4, 3, 2, 1]
        let result = [];

        result = reverse(array)
    
        for (var i in expected){
           check(result[i], expected[i]);
        }        
    })

    test("break on undefined array", function(){
        try {
            let noArray = 8;
            reverse(noArray)
            throw Error("Should not reach this point")
        } catch (error){
            check(error.message, "8 is not an array")
        }
    })
});