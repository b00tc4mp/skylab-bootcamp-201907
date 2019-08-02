'use strict'

describe('arrayFrom', function () {
    it('returns array from iterable object and can modify every item applying a map function', function () {
    
        var result = null;
        var object = 'skylab';

        result = arrayFrom(object, function(value) { return value + 5 });

        expect(result, ['s5', 'k5', 'y5', 'l5', 'a5', 'b5']);
    });
});