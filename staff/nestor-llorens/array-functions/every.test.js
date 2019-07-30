'use strict'

describe('every', function () {
    it('returns true if all elements comply condition on function', function () {
    
        var result = null;
        var array = [1,2,3];

        result = every(array, function(value) { return value < 4 });

        expect(result, true);
    });
});