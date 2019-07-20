'use strict';

describe('Curray', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });

        it("should push more than one el", function(){
            var curray = new Curray(1,2);
            var result = curray.push(3,4);

            expect(result).toBe(4);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result).toBe('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
        });
    });

    describe('forEach', function() {
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

    describe("concat", function(){
        it("should join them all in one", function(){
            var curray = new Curray(1,2,3);
            var curr1 = new Curray(4,5,6);
            var curr2 = new Curray("a", "b", "c");

            var result = result.concat(curray, curr1, curr2);
            console.log(result);
        });
    });

});