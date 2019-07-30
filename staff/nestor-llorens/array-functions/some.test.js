'use strict'

describe('some', function () {
    it('returns true if atleast 1 element complies condition on function', function () {
    
        var result = null;
        var array = [1,3,5];

        result = some(array, function(value) { return value < 1 });

        expect(result, false);
    });
});