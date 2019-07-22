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

            expect(result).toBe(3);
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

            expect(curray).toBe("1,2,3,4,5,6,7,8,9");
        });
        it("should convert the numb to string", function() {
            var curray = new Curray(1,2,3,4,5);
            curray = curray.join(0);

            expect(curray).toBe("102030405");
        });
    });

    describe("concat", function(){
        it("should join them all in one", function(){
            var curray = new Curray(1, 2, 3);
            var curr1 = new Curray(4, 5, 6);
            
            var result = curray.concat(curr1);
            console.log(result);
            expect(result).toEqual(new Curray(1,2,3,4,5,6));
        });
    });

    describe("some", function(){
        it("should show true is any element is in the parameter", function(){
            var curray = new Curray(1, 2, 3, 4, 6, 7);

            function mayor (value){
                return value <=2;
             }
            
            var result = curray.some(curray, mayor);
            expect(result).toBe(true);
        });
        it("should show false due to no element in the parameter", function(){
            var curray = new Curray(1, 2, 3, 4, 6, 7);

            function mayor (value){
                return value >= 10;
             }
            
            var result = curray.some(curray, mayor);
            expect(result).toBe(false);
        });
    });

    describe("some", function(){
        it("should return the the sum of the values *10", function(){
            var curray = new Curray(1, 2, 3, 4, 5);

            function suma(value){
                return value * 10;
            }

            curray = curray.reduce(curray, suma);
            expect(curray).toBe(150);
        });
    });
    describe("filter", function(){
        it("should return the values lower than 5", function(){
            var curray = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9);
            
            function mayor (value){
                return value <= 5;
             }
            
            var result = curray.filter(curray, mayor);
            expect(result).toEqual(new Curray(1,2,3,4,5));
        });
    });

    describe("from", function(){
        it("should return the values lower than 5", function(){
            var curray = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9);
            
            function suma(value){
                return value * 10;
            }
            
            var result = curray.from(5, suma);
            expect(result).toEqual(new Curray(60, 70, 80, 90));
        });
        
    });



});


