'use strict';

describe('Curray', function() {
    describe('Concat', function() {
        it('Concatenate two or more Currays', function() {
            var curray1 = new Curray('a', 'b', 'c');
            var curray2 = new Curray('d', 'e', 'f');
            var result = curray1.concat(curray2);
            var resultArr = Array.from(result);
            expectArrays(resultArr, ["a", "b", "c", "d", "e", "f"]);
        });
    });

    describe('copyWithin', function() {
        it('Method shallow copies part of an Curray to another location in the same Curray and returns it without modifying its length', function() {
            var curray = new Curray(0, 1, 2, 3, 4, 5, 6, 7);
            var result = curray.copyWithin(0, 2, 4);
            var resultArr = Array.from(result);
            expectArrays(resultArr, [2, 3, 2, 3, 4, 5, 6, 7]);
        })
    });

    describe('find', function() {
        it('Method returns the value of the first element in the Curray that satisfies the provided testing function. Otherwise undefined is returned', function() {
            var curray = new Curray(1, 2, 3 , 4 , 5);
            var result =curray.find(function(element) {
                return element < 10;
            });
            expect(result, 1);
        });
    });

    describe('includes', function() {
        it('Return true or false if it finds the value', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.includes(1);
            expect(result, true);
        });
    });
});