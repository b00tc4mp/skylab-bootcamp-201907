'use strict';

describe('Curray', function () {
    

    describe('concat', function() {
        it('should concatenate two currays', function() {
            var curray = new Curray ("a", "b");
            var curray2 =  new Curray ("c", "d");
            var result =  curray.concat(curray2);
            var realrray = Array.from(result);

            expect(realrray).toEqual(["a", "b", "c", "d"]);
        });

        it('should return error if  argument missing', function() {
            var curray = new Curray();

            expect(function() {
                curray.concat();
            }).toThrowError(TypeError, 'missing argument 0 when calling function concat');
        });
    })


    
    describe('every', function(){
        it('should return true if all elements in curray match with function', function(){
            var curray = new Curray ('a', 'b','c');
    
            var result = curray.every(x => x = 'd');
    
            expect(result).toBe(false);
           
        });
    });

    describe('fill',function(){
        it ('should fill all the elements of an array with a static value.', function(){
            var curray = new Curray ("Banana", "Orange", "Apple", "Mango");
            var result = curray.fill("Kiwi",2,4);
            result = Array.from(result);
            
            expect (result).toEqual(["Banana","Orange","Kiwi","Kiwi"]);


        });
    });

    describe('filter',function(){
        it ('should filter all elements respecting  condition(s) passed as a function', function(){
            var curray = new Curray ('a','bb','ccc','dddd','eeeee');
            var result = curray.filter(x => x.length > 3);
            var resultArray = Array.from(result);
            expect (resultArray).toEqual(['dddd','eeeee']);
    
    
        });
    });

    describe('flat', function() {
        it('should flatten a curray/one level', function() {
            var curray1 = new Curray(1,2,3,new Curray("a","b","c",new Curray(true, false)));
 
                var result = curray1.flat();
                expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', new Curray(true, false)]);
        });
        it('should flatten a curray/two level', function() {
            var curray1 = new Curray;
            curray1 = ([1, 2, 3, ['a', 'b', 'c', [true, false]]]) ;
            var result = curray1.flat(2);
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false]);
        });
    });

    describe('forEach', function () {
        it('should output each element index and curray', function () {
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

        it('should return error if  argument missing', function() {
            var curray = new Curray();

            expect(function() {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    describe('includes', function() {
        it('should search a value in array, return a boolean according to the result', function() {
            var curray = new Curray(1,2,3,4);
            var result = curray.includes(5);

            expect(result).toEqual(false);
        });

        it('should return error if  argument missing', function() {
            var curray = new Curray();

            expect(function() {
                curray.includes();
            }).toThrowError(TypeError, 'missing argument 0 when calling function includes');
        });
    });

    

    describe('join', function(){
        it ('should return a new string concatenating the elements of the initial array', function(){
            var curray = new Curray('a','b','c');

            var result = curray.join();

            expect (result).toEqual("a,b,c");

        });

        it('should return a new string with  ? as a separator', function() {
            var curray = new Curray ('a', 'b', 'c');
            var result = curray.join('?');

            expect(result).toEqual("a?b?c");
        });
    });

    describe('lastIndexOf', function() {
        it('should find last index of introduced element', function() {
            var curray = new Curray ('a', 'b', 'a', 'c', 'a', 'e', 'f');
            var result = curray.lastIndexOf('a');

            expect(result).toEqual(4);
        });
    });

    describe('map', function () {
        it('multiply by 10 all items', function () {
            var curray1 = new Curray (1, 2, 3);
   

            var result = curray1.map(function (value) { return value * 10; });
           result=Array.from(result)
           expect(result).toEqual([10, 20, 30]);
        });
   
         it('wrap each element between <>', function () {
             var curray1 = new Curray ('1', '2', '3');

             var result = [];
   
             result = curray1.map(function (value) { return '<' + value + '>'; });
             result=Array.from(result)
             expect(result).toEqual(["<1>", "<2>", "<3>"]);
         });
         
         it('should return error if  argument missing', function() {
           var curray1 = new Curray();

           expect(function() {
               curray1.map();
           }).toThrowError(TypeError, 'missing argument 0 when calling function map');
       });
   
       
    });

    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result).toBe('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
        });
    });

    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });
    });

    describe('reduce', function() {
        it('should execute a reducer function on each element of curray', function() {
            var curray = new Curray(1, 2, 3, 4);
            var result = curray.reduce(function(accumulator, value) {
                return accumulator * value;
            });

            expect(result).toEqual(24);
        });

        it('should return error if  argument missing', function() {
            var curray = new Curray();

            expect(function() {
                curray.reduce();
            }).toThrowError(TypeError, 'missing argument 0 when calling function reduce');
        });
    })

    describe('reduceRight', function() {
        it('should apply a function against an accumulator and each value of curray from right to left', function() {
            var curray = new Curray ('A', 'B', 'C');
            var result = '';
            var expected = 'CBA';

            result = curray.reduceRight(function (empty, current) {
                return empty + current;
            });
            for (var i in result) {
                expect(result[i], expected[i]);
            }

            expect(result).toEqual(expected);
        });

        it('should return error if  argument missing', function() {
            var curray = new Curray();

            expect(function() {
                curray.reduceRight();
            }).toThrowError(TypeError, 'missing argument 0 when calling function reduceRight');
        });

        it('should break when expression is not a function', function (){
            var curray = new Curray();
            expect(function() {
                curray.reduceRight('x');
            }).toThrowError(TypeError,'x is not a function');
        });
    })

    describe('reverse', function(){
        it ('shoud reverse the array (destructive)', function(){
            var curray = new Curray('a','b','c');
            var result = curray.reverse();

            expect (result).toEqual(['c','b','a']);

        });

    });

    describe('shift', function(){
        it ('should remove the first element from the initial array and returns that removed ', function(){
            var curray = new Curray('a','b','c');
            var result = curray.shift();
            
            expect(result).toBe('a');
            expect(curray.length).toBe(2);
        });
    });

    describe("slice", function(){
        it('should break if first is not a number', function() {
            var curray = new Curray();
            expect(function() {
              curray.slice('a', 6);
            }).toThrowError(TypeError, 'a is not a number');
          });
      
          it('should should break if final is not undefined and is not a number', function() {
            var curray = new Curray();
            expect(function() {
              curray.slice(5, 'b');
            }).toThrowError(TypeError, 'b is not a number');
          });
    });

    describe('some', function(){
        it('should return true if at least one element in curray match with function', function(){
            var curray = new Curray (1, 3, 5, 7, 11, 15);
            var result = curray.some(function (element) { return element > 10 });

            expect(result).toEqual(true);
        });

        it('should return error if no argument', function() {
            var curray = new Curray();

            expect(function() {
                curray.some();
            }).toThrowError(TypeError, 'missing argument 0 when calling function some');
        });

        it('should break when expression is not a function', function (){
            var curray = new Curray();
            expect(function() {
                curray.some('x');
            }).toThrowError(TypeError,'x is not a function');
        });
    })

    describe('sort', function() {
        it('should sort curray', function() {
            var curray = new Curray ('March', 'Jan', 'Feb', 'Dec');
            var result = curray.sort();

            expect(result).toEqual(["Dec", "Feb", "Jan", "March"]);
        });
    })


    describe('splice', function() {
        it('should delete some elements and add spme others', function() {
            var curray = new Curray (1, 2, 3, 4, 5, 6);
            var result = curray.splice(2, 1, 'a', 'b');

            expect(result).toEqual([1, 2, "a", "b", 4, 5, 6]);
        });

        it('should return an empty curray', function() {
            var curray = new Curray (1, 2, 3, 4, 5, 6);
            var result = curray.splice();

            expect(result).toEqual([]);
        });
    })

    describe('unshift', function() {
        it('should add elements to the start of curray and return new length, case 1', function() {
            var array = [1,2,3,4,5,6];
            var result = array.unshift(-1, 2);

            expect(result).toEqual(8);
        });

        it('should add elements to the start of curray and return new length, case 2', function() {
            var array = [1,2,3,4,5,6];
            var result = array.unshift();

            expect(result).toEqual(6);
        });
    })

});