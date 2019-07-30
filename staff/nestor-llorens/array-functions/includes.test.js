'use strict'

describe('includes', function () {
    it('check if item exists in array', function () {
    
        var result = 0;
        var array = [1,3,5];

        result = includes(array, 3);

        expect(result, true);
    });

    it('check if item exists in array starting from fixed position', function () {
    
        var result = 0;
        var array = ['a','b','c'];

        result = includes(array, 'a', 1);

        expect(result, false);
    });

    it('check if item exists in array starting from fixed position (negative number, starts from the end)', function () {
    
        var result = 0;
        var array = ['a','b','c'];

        result = includes(array, 'a', -3);

        expect(result, true);
    });
});