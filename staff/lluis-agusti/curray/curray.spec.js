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

    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result).toBe('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
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

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    describe('concat', function () {
        it('should concat 2 elements', function () {
            var curray = new Curray(1, 2, 3);

            var curray2 = new Curray(4, 5, 6);

            var result = curray.concat(curray2);
            expect(result).toEqual[1, 2, 3, 4, 5, 6];
        });
    });


    describe('flat', function () {
        it('should flatten a curray/one level', function () {
            var curray1 = new Curray(1, 2, 3, new Curray("a", "b", "c", new Curray(true, false)));

            var result = curray1.flat();
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', new Curray(true, false)]);
        });
        it('should flatten a curray/two level', function () {
            var curray1 = new Curray;
            curray1 = ([1, 2, 3, ['a', 'b', 'c', [true, false]]]);
            var result = curray1.flat(2);
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false]);
        });
    });

    describe('copyWithin', function () {
        it('should copy part of the curray whouth changing the lenght', function () {
            var curray1 = new Curray();

            curray1 = ([1, 2, 3]);

            var result = curray1.copyWithin(1, 2);
            expect(result).toEqual([1, 3, 3]);
        });
        it('should fail on no arguments', function () {
            var curray1 = new Curray();

            expect(function () {
                curray1.copyWithin();
            }).toThrowError(TypeError, 'missing argument 0 when calling function copyWithin');
        });
    });


    describe('map', function () {
        it('multiply by 10 all items', function () {
            var curray1 = new Curray(1, 2, 3);


            var result = curray1.map(function (value) {
                return value * 10;
            });
            result = Array.from(result)
            expect(result).toEqual([10, 20, 30]);
        });

        it('wrap each element between <>', function () {
            var curray1 = new Curray('1', '2', '3');

            var result = [];

            result = curray1.map(function (value) {
                return '<' + value + '>';
            });


            result = Array.from(result)
            expect(result).toEqual(["<1>", "<2>", "<3>"]);
        });

        it('should fail on no arguments', function () {
            var curray1 = new Curray();

            expect(function () {
                curray1.map();
            }).toThrowError(TypeError, 'missing argument 0 when calling function map');
        });

        //  it('concatenate value-index-array', function () {
        //      var array = [1, 2, 3];

        //      var result = map(array, function (value, index, array) {
        //          return value + '-' + index + '-' + array;
        //      });

        //      expect(result, ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);
        //  })
    });

    describe('arrayOf', function () {
        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, 2, 3, 'hello', {}, NaN);

            var result = (curray).arrayOf();
            expect(Array.from(result)).toEqual([1, 2, 3, 'hello', {}, NaN]);
        })
    });

    describe('every', function () {
        it('should check all elements of the curray pass the condition of the function done', function () {
            var curray = new Curray(1, 30, 29, 10, 13);

            var result = (curray).every(function (currentValue) {
                return currentValue > 30;
            });
            expect(result).toBe(false);
        })
    });

    describe('fill', function () {
        it('should fill all the items with the input introduced to and from the desired start index', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.fill(5, 1);


            result = Array.from(result);
            expect(result).toEqual([1, 5, 5, 5, 5]);

        });

        it('fill all the items with the input passed to a fill from the start index you passed', function () {

            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.fill(5);
            var expected = [5, 5, 5, 5, 5];

            //we do a for loop in order to compare the items of the arrays
            //because with expectArrays we can't compare arrays with Objects(result is an Object)
            var arrResult = Array.from(result)
            expect(arrResult).toEqual(expected);
        });

        /*
        describe('fill',function(){
            it('should fill some elements from an appointed start point to an appointed end point (zero-index location) of the curray', function(){
                var curray1 = new Curray('a', 'b', 'c', 'd', 'f','g');

                var result = curray1.fill("z", 2);

                expect(Array.from(result)).toEqual(['a', 'b', 'z', 'z', 'z', 'z']);
            })
        });
        */

    });


    describe("join", function(){
        it('should join in a string', function() {
            var curray = new Curray(1,2,3,4,5,6,7,8,9);
            curray = curray.join("-");
 
            expect(curray, "1-2-3-4-5-6-7-8-9");
        });
        it("should put a ',' as separator", function() {
            var curray = new Curray(1,2,3,4,5,6,7,8,9);
            curray = curray.join( );
 
            expect(curray, "1,2,3,4,5,6,7,8,9");
        });
        it("should convert the numb to string", function() {
            var curray = new Curray(1,2,3,4,5);
            curray = curray.join(0);
 
            expect(curray, "102030405");
        });
    });

});
