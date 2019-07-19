'use strict';
//push
describe('Curray', function() {
    describe('push', function() {
        it(
            'should push a string',
            function() {
                var curray = new Curray();

                var result = curray.push('hola mundo');

                expect(curray[0]).toBe('hola mundo');
                expect(result).toBE(1);
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

                expect(result).toBe('mundo');
                expect(curray.length).toBe(1);
                expect(curray[1]).toBeUndefined();
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
        
                expect(outputs).toEqual([
                    ['a', 0, curray],
                    ['b', 1, curray],
                    ['c', 2, curray]
                ]);
        });

        it('should fail on no arguments', function() {
            var curray = new Curray();

            expect(function() {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    // entries
    describe('entries' , function(){
        it(
            "should return [key:value] pair for each position of the array",
            function() {
                var curray = new Curray('a','b','c');

                var outputs = [];
                
                outputs = curray.entries(curray);

                expect(outputs).toEqual([[0,'a'] , [1,'b'] , [2,'c']]);
        });
    });
    
    // find
    describe('find' , function(){
        it(
            "should return the value of the first element in the array maior than 1",
            function() {
                var curray = new Curray(1,2,3,4,5);
                
                var item = curray.find(function(element){
                return element>1;
            });

            expect(item).toBe(2);
        });
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
        
        it('should throw error => undefined is not a function', function() {
            expect(function() {
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                var index = curray.findIndex();
            }).toThrowError(TypeError, 'undefined is not a function');
        });
    });

    // findIndex()
    describe('findIndex' , function(){
        // HAPPY PATH
        it(
            "should return the index of the first element in the array maior than 1",
            function(){
                var curray = new Curray('John' , 'Paul' , 'George' , 'Ringo');

                var index = curray.findIndex(function(element){
                    return element === 'Ringo';
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

    // concat()
    // describe('concat' , function(){
    //     // HAPPY PATH
    //     // it("should concat two given arrays" , 
    //     // function(){
    //     //     var curray1 = new Curray(1,2,3);
    //     //     var curray2 = new Curray(4,5);
    //     //     var curray3 = new Curray(0);

    //     //     curray3 = curray1.concat(curray2);

    //     //     expectArrays(Array.from(curray3) , [1,2,3,4,5]);
    //     // });

    //     // WRONG PATH
    //     it("should throw error => 'expression is not a function",
    //         function(){
    //             var curray1 = 1;
    //             var curray2 = new Curray(4,5);
    //             var curray3 = new Curray(0);

    //             curray3 = curray1.concat(curray2);
    //         },
    //         function(error){
    //             expect(error instanceof TypeError , true);
    //             expect(error.message , "curray1.concat is not a function");
    //         }
    //     );
    // })
});