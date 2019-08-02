'use strict'

describe('arrayOf', function () {
    it('creates an array containing all arguments passed', function () {
    
        var result = null;

        result = arrayOf('skylab', 'coders', 0 , 'a', 5);

        expect(result, ['skylab', 'coders', 0 , 'a', 5]);
    });
});