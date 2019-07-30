'use strict'

describe('filter', function () {
    it('return elements which comply expression', function () {
    
        var result = 0;
        var array = [1,3,5];

        result = filter(array, function(value) {return value > 1});

        expect(result, [3,5]);
    });
});