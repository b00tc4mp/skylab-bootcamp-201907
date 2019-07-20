'use strict'

describe('reduce', function () {
    it('apply expression to every elemnent and sum it to acc', function () {
    
        var result = 0;
        var array = [1,3,5];

        result = reduce(array, function(value) { return value +2 });

        expect(result, 15);
    });
});