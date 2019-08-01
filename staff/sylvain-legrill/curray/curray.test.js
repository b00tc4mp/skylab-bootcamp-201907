'use strict';

describe('Curray', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

    describe('every', function(){
        it('should return boolean if every element(s) specified is/are in curray', function(){
            var curray = new Curray ('a', 'b','c');

            var result = curray.every(x => x = 'd');

            expect (result, false);
           
        });
    });

    describe('filter',function(){
        it ('should filter all elements respecting  condition(s) passed as a function', function(){
            var curray = new Curray ('a','bb','ccc','dddd','eeeee');
            var result = curray.filter(x => x.length > 3);
            var resultArray = Array.from(result);
            expectArrays (resultArray,['dddd','eeeee']);


        });
    });

    // describe('fill',function(){
    //     it ('should fill the specified elements of an array with a static value.', function(){
    //         var curray = new Curray ("Banana", "Orange", "Apple", "Mango");
    //         var result = curray.fill("Kiwi", 2 ,4);
            
    //         expect(result, ["Banana","Orange","Kiwi","Kiwi"]);


    //     });
    // });
    // describe('fill',function(){
    //     it ('should fill all the elements of an array with a static value.', function(){
    //         var curray = new Curray ("Banana", "Orange", "Apple", "Mango");
    //         var result = curray.fill("Kiwi");
            
    //         expect(result, ["Kiwi","Kiwi","Kiwi","Kiwi"]);


    //     });
    // });
      

    describe('forEach', function() {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');
    
            var outputs = [];
    
            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });
    
            expectArrays(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });
    });
});