'use strict';

//push
describe('Curray', function() {
    describe('push', function() {
        // HAPPY PATH
        it(
            'should push a string',
            function() {
                var curray = new Curray();

                var result = curray.push('hola mundo');

                expect(curray[0], 'hola mundo');
                expect(result, 1);
        });
    });
    //pop
    describe('pop', function() {
        // HAPPY PATH
        it(
            'should pop a string',
            function() {
                var curray = new Curray('hola', 'mundo');

                var result = curray.pop();

                expect(result, 'mundo');
                expect(curray.length, 1);
                expect(curray[1], undefined);
        });
    });

    // forEach
    describe('forEach', function() {
        // HAPPY PATH
        it(
            'should output each element index and curray',
            function () {
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

    // entries
    describe('entries' , function(){
        // HAPPY PATH
        it(
            "should return [key:value] pair for each position of the array",
            function() {
                var curray = new Curray('a','b','c');

                var outputs = [];
                
                outputs = curray.entries(curray);

                expectArrays(outputs , [[0,'a'] , [1,'b'] , [2,'c']]);
        });
    });
    
    // find
    describe('find' , function(){
        // HAPPY PATH
        it(
            "should return the value of the first element in the array maior than 1",
            function() {
                var curray = new Curray(1,2,3,4,5);
                
                var item = curray.find(function(element){
                return element>1;
            });

            expect(item , 2);
        });

         // WRONG PATH
         it(
            "should throw error => 3 is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                var index = curray.findIndex(3);
            } ,
            function(error){
                expect(error instanceof TypeError , true);
                expect(error.message , "3 is not a function")
            }
        );
        
        it(
            "should throw error => undefined is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                var index = curray.findIndex();
            } ,
            function(error){
                expect(error instanceof TypeError , true);
                expect(error.message , "undefined is not a function")
            }
        );
    });

    // findIndex()
    describe('findIndex' , function(){
        // HAPPY PATH
        it(
            "should return the index of the first element in the array maior than 1",
            function(){
                // var curray = new Curray('John' , 'Paul' , 'George' , 'Ringo');
                var curray = new Curray(1,2,3,4,5);

                var index = curray.findIndex(function(element){
                    return element === 4;
            });

            expect(index , 3);
        });

        // WRONG PATH
        it(
            "should throw error => 3 is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                var index = curray.findIndex(3);
            } ,
            function(error){
                expect(error instanceof TypeError , true);
                expect(error.message , "3 is not a function")
            }
        );
        
        it(
            "should throw error => undefined is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                var index = curray.findIndex();
            } ,
            function(error){
                expect(error instanceof TypeError , true);
                expect(error.message , "undefined is not a function")
            }
        );
    })
});