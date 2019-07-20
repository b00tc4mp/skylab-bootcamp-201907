'use strict';

describe('Curray', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();
            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });

        it('should break on no arguments', function (){
            Curray.prototype.push();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function push');
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

        it('return undefined on empty curray', function() {
            var curray = new Curray();
            var value = curray.pop();

            expect(value, undefined);
        });
    });

    describe('forEach', function() {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');
            var outputs = [];
    
            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });
    
            expect(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });

        it('should break on no arguments', function (){
            Curray.prototype.forEach();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function forEach');
        });

        it('should break when expression is not a function', function (){
            Curray.prototype.forEach("a");
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a function');
        });
    });

    describe('includes', function() {
        it('should search a value in array', function() {
            var curray = new Curray(1,2,3,4);
            var result = curray.includes(5);
 
            expect(result, false);
        });

        it('should break on no arguments', function (){
            Curray.prototype.includes();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function includes');
        });
    });

    describe('every', function() {
        it('should iterate curray and evaluate an expression on each of its values', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.every(function (element) { return element > 0; });

            expect(result, true);
        });

        it('should break on no arguments', function (){
            Curray.prototype.every();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function every');
        });

        it('should break when expression is not a function', function (){
            Curray.prototype.every("a");
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a function');
        });
    });

    describe('copyWithin', function() {
        it('should copy part of curray to another part of curray without modifying its length', function() {
            var curray = new Curray(0, 1, 2, 3, 4, 5, 6, 7);
            var result = curray.copyWithin(0, 2, 4);
            var resultArr = Array.from(result);

            expect(resultArr, [2, 3, 2, 3, 4, 5, 6, 7]);
        });

        it('should break on no arguments', function (){
            Curray.prototype.copyWithin();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function copyWithin');
        });
    });

    describe('reverse', function() {
        it('should reverse curray in place, case 1', function() {
            var curray = new Curray(1, 2, 3, 4, 5);
            var result = curray.reverse();

            expect(result, [5, 4, 3, 2, 1]);
        });

        it('should reverse curray in place, case 2', function() {
            var curray = new Curray(5, 4, 3, 2, 1);
            var result = curray.reverse();

            expect(result, [1, 2, 3, 4, 5]);
        });
    })

    describe('shift', function() {
        it('should remove the first element from curray', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.shift();

            expect(result, 1)
        });
    })

    describe('some', function() {
        it('should iterate curray and evaluate an expression on at least one of its values', function() {
            var curray = new Curray (1, 3, 5, 7, 11, 15);
            var result = curray.some(function (element) { return element > 10 });

            expect(result, true);
        });

        it('should break on no arguments', function (){
            Curray.prototype.some();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function some');
        });

        it('should break when expression is not a function', function (){
            Curray.prototype.some("a");
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a function');
        });
    })

    describe('map', function() {
        it('should wrap each element between <>', function() {
            var curray = new Curray ("1", "2", "3");
            var result = curray.map(function (value) { return '<' + value + '>'; });
    
            expect(result, ["<1>", "<2>", "<3>"]);
        });

        it('should multiply by 10 all items', function () {
            var curray = new Curray (1, 2, 3);
            var result = curray.map(function (x) { return x * 10; });
    
            expect(result, [10, 20, 30]);
        });

        it('should break on no arguments', function (){
            Curray.prototype.map();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function map');
        });

        it('should break when expression is not a function', function (){
            Curray.prototype.map("a");
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a function');
        });
    })

    describe('concat', function() {
        it('should concatenate two currays', function() {
            var curray = new Curray ("hola", "amiga");
            var curray2 =  new Curray ("adios", "amigo");
            var result =  curray.concat(curray2);
            var realrray = Array.from(result);

            expect(realrray, ["hola", "amiga", "adios", "amigo"]);
        });

        it('should break on no arguments', function (){
            Curray.prototype.concat();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function concat');
        });
    })

    describe('fill', function() {
        it('should fill all the items with the input introduced to and from the desired start index', function() {
            var curray = new Curray (1, 2, 3, 4, 5);
            var result = curray.fill(5, 1);

            expect(result, [1, 5, 5, 5, 5]);
        });

        it('should fill all the items with the input introduced', function() {
            var curray = new Curray (1, 2, 3, 4, 5);
            var result = curray.fill(5);

            expect(result, [5, 5, 5, 5, 5]);
        });

        it('should break on no arguments', function (){
            Curray.prototype.fill();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function fill');
        });
    })

    describe('filter', function() {
        it('should filter all the items who accomplish the condition introduced, case 1', function() {
            var curray = new Curray ('hol', 'adi', 'guanchope','cosita','manomens');    
            var result = curray.filter(function(x) { return x.length >= 4;});
    
            expect(result, ['guanchope','cosita','manomens']);
        });

        it('should filter all the items who accomplish the condition introduced, case 2', function (){
            var curray = new Curray (1,2,3,4,5,6);
            var result = curray.filter(function(x){ return x < 4; });
    
            expect(result, [1,2,3]);
        });
    
        it('should filter all the items who accomplish the condition introduced, case ', function (){
            var curray = new Curray (1,2,3,4);
            var result = curray.filter(function(x){ return x > 5; });
    
            expect(result, []);
         });

        it('should break on no arguments', function (){
            Curray.prototype.filter();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function filter');
        });

        it('should break when expression is not a function', function (){
            Curray.prototype.filter("a");
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a function');
        });
    })

    describe('find', function() {
        it('should return the value of the first element in curray that satisfies the condition', function() {
            var curray = new Curray(1, 2, 3 , 4 , 5);
            var result =curray.find(function(element) {
                return element < 10;
            });

            expect(result, 1);
        });

        it('should break on no arguments', function (){
            Curray.prototype.find();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function find');
        });
    });

    describe('flat', function() {
        it('should flatten one level', function() {
            var curray = new Curray (1,2,3,new Curray("a","b","c",new Curray(true, false)));
            var result = curray.flat();
            expect(result, [1, 2, 3, 'a', 'b', 'c', new Curray(true, false)]);
        });

        it('should flatten two levels', function() {
            var curray = new Curray (1,2,3,new Curray("a","b","c",new Curray(true, false))) ;
            var result = curray.flat(2);
            expect(result, ([1, 2, 3, 'a', 'b', 'c', true, false]));
        });
    })

    describe('indexOf', function() {
        it('should return index', function() {
            var curray = new Curray ('ant', 'bison', 'camel', 'duck', 'bison', 'camel');
            var result = curray.indexOf('camel');

            expect(result, 2);
        });

        it('should break on no arguments', function (){
            Curray.prototype.indexOf();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function indexOf');
        });
    })

    describe('join', function() {
        it('should return a string without separations', function() {
            var curray = new Curray ('Fire', 'Air', 'Water');
            var result = curray.join();

            expect(result, "Fire,Air,Water");
        });

        it('should return a string with the @ separations', function() {
            var curray = new Curray ('Fire', 'Air', 'Water');
            var result = curray.join('@');

            expect(result, "Fire@Air@Water");
        });
    })
  
    describe('lastIndexOf', function() {
        it('should find last index of introduced element', function() {
            var curray = new Curray ('a', 'b', 'a', 'c', 'a', 'e', 'f');
            var result = curray.lastIndexOf('a');

            expect(result, 4);
        });

        it('should break on no arguments', function (){
            Curray.prototype.lastIndexOf();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function lastIndexOf');
        });
    })

    describe('reduce', function() {
        it('should execute a reducer function on each element of curray', function() {
            var curray = new Curray(1, 2, 3, 4);
            var result = curray.reduce(function(accumulator, value) {
                return accumulator * value;
            });

            expect(result, 24);
        });

        it('should break on no arguments', function (){
            Curray.prototype.reduce();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function reduce');
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

            expect(result, expected);
        });

        it('should break on no arguments', function (){
            Curray.prototype.reduceRight();
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'missing argument 0 when calling function reduceRight');
        });

        it('should break when expression is not a function', function (){
            Curray.prototype.reduceRight("a");
        }, function (error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a function');
        });
    })

    describe('slice', function() {
        it('should return a determined slice of curray, case 1', function() {
            var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
            var result = curray.slice(1, 3);

            expect(result, ["orange", "lemon"]);
        });

        it('should return a determined slice of curray, case 2', function() {
            var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
            var result = curray.slice(2);

            expect(result, ["lemon", "cherry", "avocado", "apple"]);
        });

        it('should return a determined slice of curray, case 3', function() {
            var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
            var result = curray.slice(-3);

            expect(result, ["cherry", "avocado", "apple"]);
        });

        it('should return a the whole curray', function() {
            var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
            var result = curray.slice();

            expect(result, ["banana", "orange", "lemon", "cherry", "avocado", "apple"]);
        });

        it('should break if first is not a number', function(){
            Curray.prototype.slice("a", 6);
        }, function(error) {
            expect(error instanceof TypeError, true);
            expect(error.message, 'a is not a number');
        });
    
        it('should should break if final is not undefined and is not a number', function(){
            Curray.prototype.slice(5, "b");
        }, function(error) {
            expect(error instanceof TypeError, true);
            expect(error.message, 'b is not a number');
        });

    })

    describe('sort', function() {
        it('should sort curray', function() {
            var curray = new Curray ('March', 'Jan', 'Feb', 'Dec');
            var result = curray.sort();
    
            expect(result, ["Dec", "Feb", "Jan", "March"]);
        });
    })

    describe('splice', function() {
        it('should delete some elements and add spme others', function() {
            var curray = new Curray (1, 2, 3, 4, 5, 6);
            var result = curray.splice(2, 1, 'a', 'b');

            expect(result, [1, 2, "a", "b", 4, 5, 6]);
        });

        it('should return an empty curray', function() {
            var curray = new Curray (1, 2, 3, 4, 5, 6);
            var result = curray.splice();

            expect(result, []);
        });

    })

    describe('toString', function() {
        it('should return curray as a string', function() {
            
            var curray = new Curray (1,2,3,4,5,6);
            var result = curray.toString();

            expect(result, "1,2,3,4,5,6");
        });
    })

    describe('unshift', function() {
        it('should add elements to the start of curray and return new length, case 1', function() {
            var array = [1,2,3,4,5,6];
            var result = array.unshift(-1, 2);

            expect(result, 8);
        });

        it('should add elements to the start of curray and return new length, case 2', function() {
            var array = [1,2,3,4,5,6];
            var result = array.unshift();

            expect(result, 6);
        });
    })
});
