'use strict';

describe('Curray', function () {
    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1]).toBe(undefined);
        });
    });

    describe('forEach', function() {
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
    });

    describe('toString', function(){
        it('should convert something to string', function() {
            var curray = new Curray(1, 2, 3);

            var result = curray.toString();

            expect(result).toBe("1,2,3");
        })

        it('should convert several data types, except another array', function(){
            var curray = new Curray(6, 'bb', 'pepe', 6);
    
            var result2 = curray.toString();
            expect(result2).toBe("6,bb,pepe,6");
        })

        it('should convert several data types and an array', function(){
            var curray = new Curray(6, 'bb', 'pepe', 6, [4, 'diez', 33]);

            var result3 = curray.toString();
            expect(result3).toBe("6,bb,pepe,6,4,diez,33");
        });

        it('should launch a handleError when using undefined as parameter', function(){
            var curray = new Curray();

            expect(function(){
                curray.toString();
            }).toThrowError(TypeError, 'No se puede leer la propiedad "length" de undefined');
        });

        it('should launch a handleError when using null as parameter', function(){
            var curray = new Curray(null);

            expect(function(){
                curray.toString(null);
            }).toThrowError(TypeError, 'No se puede convertir a string un objeto null');
        });
    });

    describe('fill', function(){
        it('should use all parameters (mandatory and optional)', function(){
            var curray = new Curray(1,2,3,4);

            var result = Array.from(curray.fill(0,2,4));
            expect(result).toEqual([1, 2, 0, 0]);
        });

        it('should call fill whitout end parameter', function(){
            var curray = new Curray(1, 2, 3, 4);
    
            var result = Array.from(curray.fill(5,1));
            expect(result).toEqual([1, 5, 5, 5]);
        });

        it('should call fill just using mandatory parameter', function(){
            var curray = new Curray(1,2,3,4);
    
            var result = Array.from(curray.fill(6));    
            expect(result).toEqual([6, 6, 6, 6]);
        });

        it('should launch a handleError when curray is empty', function(){
            var curray = new Curray;

            expect(function(){
                curray.fill();
            }).toThrowError(TypeError, 'fill debe contener al menos un parámetro');
        });

    })

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

    describe('map', function () {
        it('multiply by 10 all items', function () {
            var curray1 = new Curray (1, 2, 3);
            var result = curray1.map(function (value) { return value * 10; });
            
            result = Array.from(result);
            expect(result).toEqual([10, 20, 30]);
        });
     
        it('wrap each element between <>', function () {
            var curray1 = new Curray ('1', '2', '3');
            var result = [];
            
            result = curray1.map(function (value) { return '<' + value + '>'; });
            result = Array.from(result);
            expect(result).toEqual(["<1>", "<2>", "<3>"]);
        });

        
        it('should fail on no arguments', function() {
            var curray1 = new Curray();
            
            expect(function() {
                curray1.map();
            }).toThrowError(TypeError, 'missing argument 0 when calling function map');
        });
    });

    describe('unshift', function(){
        it('should place new elements at the begining of an existing Curray', function(){
            var curray = new Curray(1,2,3);

            var result = Array.from(curray.unshift(4,5));

            expect(result).toEqual([4,5,1,2,3]);
        });

        it('should place new elements at the begining of an existing Curray (with strings, longer)', function(){
            var curray = new Curray(1,2,3,4,5,6);

            var result = Array.from(curray.unshift('a', 'b', 'c'));
            expect(result).toEqual(['a', 'b', 'c', 1,2,3,4,5,6]);
        });

    });

    describe('filter',function(){
        it("default",function(){
            var curray= new Curray('hol', 'adi', 'guanchope','cosita','manomens');
            var result = curray.filter(function(val){
                return val.length >= 4;
            });
            expect(result).toEqual([ 'guanchope', 'cosita', 'manomens' ]);

        });
        
        it("should handle no arguments",function(){
            var curray=new Curray();
            expect(function(){
                curray.filter(function(val){
                    return val.length>=4;
                });
            }).toThrowError(TypeError, "No se puede convertir a string un objeto null");
        });
    });


    describe("map",function(){
        it("default",function(){
            var curray=new Curray(1,2,3);
            var coeficient=10;
            var result = curray.map(function (value) { return value * coeficient; });
            expect(result).toEqual([10, 20, 30]);
        });
    });

    describe("join",function(){
        it("default",function(){
            var curray=new Curray(1,2,3);
            var result=curray.join();
            expect(result).toEqual("1,2,3");
        });
    });

    describe("entries",function(){
        it("default",function(){
            var curray= new Curray(1,2,3);
            var result=curray.entries(1);
            expect(result).toEqual([ '0,1' ]);
        });
    });

    describe("every", function(){
        it("default",function(){
            function biggerThan(currentValue){
                return currentValue>40
            };
            var curray1=new Curray(1, 30, 39, 29, 10, 13);
            var result=curray1.every(biggerThan);
            expect(result).toBe(false);
        });
    });

    describe("indexof",function(){
        it("default",function(){
            var curray1=new Curray(1, 30, 39, 29, 10, 13);
            var result=curray1.indexOf(30);
            expect(result).toEqual("1");
        });
    });

    describe("slice",function(){
        it("default",function(){
            var curray1=new Curray('Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa');
            var result=curray1.sliceTest(1,3);
            expect(result).toEqual(['Pedro','Miguel']);
        });

        it('should fail on no arguments', function() {
            var curray1=new Curray();
            expect(function() {
                curray1.sliceTest(0,1);
            }).toThrowError(TypeError, 'missing argument 0 when calling function slice');
        });
    });

    describe('reduce', function(){
        it('should return a single value from a reduction', function(){
            var curray = new Curray(1,2,3,4);
            var reducer = (accumulator, currentValue) => accumulator + currentValue;

            var result = curray.reduce(reducer);
            expect(result).toEqual(10);
        });

        it('should return a single value from a reduction using an initial value', function(){
            var curray = new Curray(1,2,3,4);
            var reducer = (accumulator, currentValue) => accumulator + currentValue;

            var result = curray.reduce(reducer, 5);
            expect(result).toEqual(15);
        });

        it('should return a single value from a reduction (multiplication)', function(){
            var curray = new Curray(1,2,3,4);
            var reducer = (accumulator, currentValue) => accumulator * currentValue;

            var result = curray.reduce(reducer);
            expect(result).toEqual(24);
        });

        it('should return a single value from a reduction (multiplication) using an initial value', function(){
            var curray = new Curray(1,2,3,4);
            var reducer = (accumulator, currentValue) => accumulator * currentValue;

            var result = curray.reduce(reducer, 5);
            expect(result).toEqual(120);
        });
    });

    describe('concat', function(){
        it('no arguments', function(){
            var curray1 = new Curray(1,2,3);
            expect(function(){
                curray1.concat();
            }).toThrowError(ReferenceError,'missing argument 0 when calling function concat');
        });

        it('param is no Curray', function(){
            var curray1 =[1,2,3];
            var curray2 = new Curray(4,5,6);
            expect(function(){
                curray2.concat(curray1);
            }).toThrowError(TypeError, 'param is not Curray');
        });

        it('Curray is empty', function(){
            var curray1 =new Curray();
            var curray2 = new Curray(4,5,6);
            expect(function(){
                curray1.concat(curray2);
            }).toThrowError(ReferenceError, 'Curray is empty')
        });

        it('should create new curray with iterable object', function(){
            var curray1 = new Curray(1,2,3);
            var curray2 = new Curray(4,5,6);
            var result = curray1.concat(curray2); 
            result=Array.from(result);
            expect(result).toEqual([1,2,3,4,5,6]);
        });
    });

    describe('arrayOf', function () {
        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, 2, 3, 'hello', {}, NaN);

            var result = (curray).arrayOf();
            expect(Array.from(result)).toEqual([1, 2, 3, 'hello', {}, NaN]);
        });
    });

    describe('splice', function () {
        it('should delete some elements and add spme others', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.splice(2, 1, 'a', 'b');

            expect(result).toEqual([1, 2, "a", "b", 4, 5, 6]);
        });

        it('should return an empty curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.splice();

            expect(result).toEqual([]);
        });
    })

    describe('sort', function () {
        it('should sort curray', function () {
            var curray = new Curray('March', 'Jan', 'Feb', 'Dec');
            var result = curray.sort();

            expect(result).toEqual(["Dec", "Feb", "Jan", "March"]);
        });
    });

    describe('lastIndexOf', function () {
        it('should find last index of introduced element', function () {
            var curray = new Curray('a', 'b', 'a', 'c', 'a', 'e', 'f');
            var result = curray.lastIndexOf('a');

            expect(result).toEqual(4);
        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.lastIndexOf();
            }).toThrowError(TypeError, 'missing argument 0 when calling function lastIndexOf');
        });
    });

    describe('find', function () {
        it('should return the value of the first element in curray that satisfies the condition', function () {
            var curray = new Curray(1, 2, 3, 4, 5);
            var result = curray.find(function (element) {
                return element < 10;
            });

            expect(result).toEqual(1);
        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.find();
            }).toThrowError(TypeError, 'missing argument 0 when calling function find');
        });
    });

    describe('some', function () {
        it('should iterate curray and evaluate an expression on at least one of its values', function () {
            var curray = new Curray(1, 3, 5, 7, 11, 15);
            var result = curray.some(function (element) {
                return element > 10
            });

            expect(result).toEqual(true);
        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.some();
            }).toThrowError(TypeError, 'missing argument 0 when calling function some');
        });

        it('should break when expression is not a function', function () {
            var curray = new Curray();
            expect(function () {
                curray.some('x');
            }).toThrowError(TypeError, 'x is not a function');
        });
    });

    describe('shift', function () {
        it('should remove the first element from curray', function () {
            var curray = new Curray(1, 2, 3);
            var result = curray.shift();

            expect(result).toEqual(1);
        });
    });

    describe('reverse', function () {
        it('should reverse curray in place, case 1', function () {
            var curray = new Curray(1, 2, 3, 4, 5);
            var result = curray.reverse();

            expect(result).toEqual([5, 4, 3, 2, 1]);
        });

        it('should reverse curray in place, case 2', function () {
            var curray = new Curray(5, 4, 3, 2, 1);
            var result = curray.reverse();

            expect(result).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('includes', function () {
        it('should search a value in array', function () {
            var curray = new Curray(1, 2, 3, 4);
            var result = curray.includes(5);

            expect(result).toEqual(false);
        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.includes();
            }).toThrowError(TypeError, 'missing argument 0 when calling function includes');
        });
    });
});