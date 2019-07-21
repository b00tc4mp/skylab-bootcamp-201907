'use strict';

describe('Curray', function() {
    
    //push
    describe('push', function() {
        it('should push a string',
            function() {
                var curray = new Curray();

                var result = curray.push('hola mundo');

                expect(curray[0]).toBe('hola mundo');
                expect(result).toBe(1);
        });
    });
    

    //pop
    describe('pop', function() {
        it('should pop a string',
            function() {
                var curray = new Curray('hola', 'mundo');

                var result = curray.pop();

                expect(result).toBe('mundo');
                expect(curray.length).toBe(1);
                expect(curray[1]).toBeUndefined();
        });
    });


    //forEach
    describe('forEach', function() {
        it('should output each element index and curray',
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


    //entries
    describe('entries' , function(){
        it("should return [key:value] pair for each position of the array",
            
            function() {
                var curray = new Curray('a','b','c');
                var outputs = [];

                outputs = curray.entries(curray);

                expect(outputs).toEqual([[0,'a'] , [1,'b'] , [2,'c']]);
        });
    });
    

    //find
    describe('find' , function(){
        it("should return the value of the first element in the array maior than 1",
            function() {
                var curray = new Curray(1,2,3,4,5);

                var item = curray.find(function(element){
                return element>1;
            });

            expect(item).toBe(2);
        });

        it("should fail if no arguments",
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                
                expect(function() {
                        var index = curray.find();
                }).toThrowError(TypeError , "undefined is not a function");
        });
        
        it( "should throw error if argument is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');
                
                expect(function(){
                    var index = curray.find(3);
            }).toThrowError(TypeError , "3 is not a function");
        });
    });


    //findIndex
    describe('findIndex' , function(){
        it("should return the index of the first element in the array maior than 1",
            function(){
                var curray = new Curray('John' , 'Paul' , 'George' , 'Ringo');

                var index = curray.findIndex(function(element){
                    return element === 'Ringo';
            });

            expect(index , 3);
        });

        it("should throw error => 3 is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');

                expect(function(){
                    var index = curray.findIndex(3);
                }).toThrowError(TypeError , "[object Object] is not a function" );
        });
        
        it("should throw error => undefined is not a function" ,
            function(){
                var curray = new Curray ('John' , 'Paul' , 'George' , 'Ringo');

                expect(function(){
                   var index = curray.findIndex(); 
                }).toThrowError(TypeError , "undefined is not a function");
        });
    });


    //concat
    describe('concat' , function(){
        it("should concat two given arrays" , 
        function(){
            var curray1 = new Curray(1,2,3);
            var curray2 = new Curray(4,5);
            var curray3 = new Curray(0);

            curray3 = curray1.concat(curray2);

            expect(Array.from(curray3)).toEqual([1,2,3,4,5]);
        });

        it("should throw error => 'expression is not a function",
            function(){
                var curray1 = 1;
                var curray2 = new Curray(4,5);
                var curray3 = new Curray(0);

                expect(function(){
                    curray3 = curray1.concat(curray2);
                }).toThrowError(TypeError ,"curray1.concat is not a function");   
            });
    });


    //from
    describe("from" , function(){
        it("should create a new Array instance from a string.",
            function(){
                var str = 'hello';
                var fromArray = Curray.prototype.from(str);

                expect(fromArray).toEqual(['h','e','l','l','o']);
            }
        );

        it("should create and map (*2) a new Array instance from a numbers array",
            function(){
                var curray = new Curray(1,2,3,4,5);
                var fromMappedArray = Curray.prototype.from(curray , function(item){
                    return item * 2;
                });

                expect(fromMappedArray).toEqual([2,4,6,8,10]);
            }
        );

        it("should throw error => Cannot convert undefined or null to object",
            function(){
                expect(function(){
                    var fromArray = Curray.prototype.from();
                }).toThrowError(TypeError , "Cannot convert undefined or null to object");
            }
        );
    });

    describe('isArray' , function(){
        it("should determine wether the passed value is a Curray" , function(){
            
            var curray = new Curray(1,2,3);
            
            expect(Curray.prototype.isCurray(curray)).toBe(true);
        });
    });
    
    describe('copyWithin' , function(){
        it("should copy part of an array to another location in the same array and returns it without modifying its length" , function(){
            var curray = new Curray (1,2,3,4,5);

            var copy = new Curray();
            copy = curray.copyWithin(-1);

            expect(Array.from(copy)).toEqual([1,2,3,4,1]);
        });
    });

});