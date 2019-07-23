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
        it("should copy part of an array to penultimate and last position in the same array and return it without modifying its length" , function(){
            var curray = new Curray (1,2,3,4,5);

            var copy = new Curray();
            copy = curray.copyWithin(-2);

            expect(Array.from(copy)).toEqual([1,2,3,1,2]);
        });

        it("should copy part of an array using a target and a start position in the same array and return it without modifying its length" , function(){
            var curray = new Curray(1,2,3,4,5);
            var copy = new Curray();
            copy = curray.copyWithin(1,2);

            expect(Array.from(copy)).toEqual([1,3,4,5,5]);
        });

        it("should copy part of an array using a target and a start and end position in the same array and return it without modifying its length" , function(){
            var curray = new Curray(1,2,3,4,5);
            var copy = new Curray();
            copy = curray.copyWithin(1,2,-2);

            expect(Array.from(copy)).toEqual([1,3,3,4,5]);
        })
    });

    describe('every' , function(){
        it("should return true" , function(){
            var curray = new Curray(5,6,7,8,9);
            var result = curray.every(function(item){
                return item > 2;
            });

            expect(result).toBe(true);
        });

        it("should return false" , function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.every(function(item){
                return item > 5
            });

            expect(result).toBe(false);
        });

        it("should throw an error => no function invoqued" , function(){
            var curray = new Curray(1,2,3,4,5);
            
            expect(function(){
                var result = curray.every();
            }).toThrowError(TypeError , "undefined is not a function");
        });
    });

    describe("fill" , function(){
        it("should fill all the array with the invoqued value" , function(){
            var curray = new Curray(1,2,3,4,5);
            curray.fill(8);
            expect(Array.from(curray)).toEqual([8,8,8,8,8]);
        });

        it("should fill all the array positions with the invoqued value from a start position" , function(){
            var curray = new Curray(1,2,3,4,5);
            curray.fill(8,1);
            expect(Array.from(curray)).toEqual([1,8,8,8,8]);
        });
        
        it("should fill all the array positions with the invoqued value from a start position to a end position" , function(){
            var curray = new Curray(1,2,3,4,5);
            curray.fill(8,1,-3);
            expect(Array.from(curray)).toEqual([1,8,3,4,5]);
        });
    });

    describe("filter" , function(){
        it("should return an array with elements minor 3" , function(){
            var curray = new Curray(1,2,3,4,5);
            var filtered = new Curray();

            filtered = curray.filter(function(item){
                return item < 3;
            });

            expect(Array.from(filtered)).toEqual([1,2]);
        });
        
        it("should return an array with typeof = 'string'" , function(){
            var curray = new Curray(1,'a',3,'b',5);
            var filtered = new Curray();

            filtered = curray.filter(function(item){
                return typeof item === 'string'
            });

            expect(Array.from(filtered)).toEqual(['a','b']);
        });
    });

});