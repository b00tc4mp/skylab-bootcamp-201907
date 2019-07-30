'use strict'

describe('forEach', function () {
    it('sum all numbers (items) in array', function () {
    
        var result = 0;
        var array = [1,3,5];

        forEach(array, function (item) {
           result += item;
        });

        expect(result, 9);
    });

    it('output every element on array, index and original array', function () {
    
        var array = ['a','b','c'];
        var accumulator = [];

        forEach(array, function (item, index, array) {
           accumulator.push([item, index, array]);
        });

        expect(accumulator, [['a', 0, ['a', 'b', 'c']],
                            ['b', 1, ['a', 'b', 'c']],
                            ['c', 2, ['a','b','c']]]);
    });















});

