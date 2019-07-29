'use strict';

describe('Curray', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

    describe('forEach', function() {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');
    
            var outputs = [];
    
            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });
    
            expectArrays(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });
    });


    describe('fill', function() {
        it('fill all the items with the input passed to a fill from the start index you passed', function () {
           
            var curray = new Curray(1, 2, 3, 4, 5);
    
            var result = curray.fill(5, 1);
            
            var expected = [1, 5, 5, 5, 5];

            //we do a for loop in order to compare the items of the arrays
            //because with expectArrays we can't compare arrays with Objects(result is an Object)
             for(var i=0; i<result.length; i++){
                expect(result[i], expected[i]);
            }


        });
        
         it ('fill all the items with the input passed to a fill from the start index you passed', function(){
   
            var curray = new Curray(1, 2, 3, 4, 5);
            
            var result2 = curray.fill(5);
            var expected =  [5, 5, 5, 5, 5];

            //we do a for loop in order to compare the items of the arrays
            //because with expectArrays we can't compare arrays with Objects(result is an Object)
            var arrResult = Array.from(result2)
            expectArrays(arrResult, expected); 

          
         });
        //error case with fill
        it('has no arguments', function (){
            var curray = new Curray();
            curray.fill();
        }, function (error){
            expect(error.message, 'missing argument 0 when calling function fill');
    
        });

   

    });

       
    describe('filter', function (){
        it('filter all the items who accomplish the condition passed as a function', function(){
            
            var curray = new Curray('hol', 'adi', 'guanchope','cosita','manomens');
                
            var result = curray.filter(function(val){
                return val.length >= 4;
            });
            var expected=['guanchope','cosita','manomens'];
            var arrResult = Array.from(result)
            expectArrays(arrResult, expected); 

            
    
        });

        it('filter all the items who accomplish the condition passed as a function', function (){

            var curray = new Curray (1,2,3,4,5,6);
                                
            var result2 = curray.filter(function(val){
                return val < 4;
            });

            var expected=[1,2,3];
            var arrResult = Array.from(result2)
            expectArrays(arrResult, expected); 

            
        });
    


        it('has no arguments', function (){
            var curray = new Curray();
            curray.filter();
        }, function (error){
            
            expect(error.message, 'missing argument 0 when calling function filter');
    
        });
    
    });
    

    describe('every', function(){
        
        it('check if the value passed is the same of all the items of an array', function(){
            var curray = new Curray ('a', 'a', 'a');

            var result = curray.every(function(val){
                return val === 'a';
            });
    
            expect(result, true);
        });


        it('check if the value passed is the same of all the items of an array', function(){

        var curray =new Curray (1,2,3,4);
        var result2 = curray.every(function(val){
            return val === 1;
        });
        
          expect(result2, false);

    });

        it('has no arguments', function (){
            var curray = new Curray();
            curray.every();
        }, function (error){
            
            expect(error.message, 'missing argument 0 when calling function every');
    
        });


    });

    describe('shift', function(){
        it('should delete the first item of the array passed', function(){
            var curray= new Curray(1,2,3,4,5);
            var result = curray.shift();
   

            expect(result, 1);

        });

        it('should delete the first item of the array passed', function(){
            var curray = new Curray('a', 'b', 'c','d');
            var result2 = curray.shift();

            expect(result2, 'a');

        });

        it ('should delete the first item of the array passed', function(){
            var curray = new Curray();
            var result3 = curray.shift();

            expect(result3, undefined);
        });

        

    });


    describe('unshift', function(){

        it('should add items to an array and return the length of the array ', function(){
            var curray = new Curray(1,2,3);
    
            var result = curray.unshift(4,5);

            expect (result, 5);

        });


        it('should add items to an array and return the length of the array ', function(){
            var curray = new Curray(1,2,3);
            var result = curray.unshift(4,5,'d',7,8,9);

            expect (result, 9);
            
        });

        it('should add items to an array and return the length of the array ', function(){
            var curray = new Curray(1,2,3);
            var result = curray.unshift();

            expect (result, 3);

        });

    });
  
   

    describe('IndexOf', function(){

        it('should find the index of the value passed to the method', function(){
          var curray = new Curray(1,2,3,4,5);
          var result = curray.indexOf(2);

          expect (result, 1); 

      });  

      it('should find the index of the value passed to the method', function(){
        var curray = new Curray(1,2,3,4,5);
        var result = curray.lastIndexOf(6);

        expect (result, -1); 

    });

    }); 


    describe('lastIndexOf', function(){

          it('should find the index of the value passed to the method', function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.lastIndexOf(2);

            expect (result, 1); 

        });  
        it('should find the index of the value passed to the method', function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.lastIndexOf(6);

            expect (result, -1); 

        });

        it('should find the index of the value passed to the method', function(){
            var curray = new Curray(1,2,3,4,5,6,7,8,9);
            var result = curray.lastIndexOf(3,2);

            expect (result, 2); 

        }); 


    });

    describe('slice', function(){

        it('should returns a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result = curray.slice(2);
            result = Array.from(result); 
            var expected=  ['camel', 'duck', 'elephant'];
         
            expectArrays (result, expected);
        });

         it('should returns a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result  = curray.slice(2,4);
            result= Array.from(result);
           
            expectArrays(result, ["camel", "duck"]);

        }); 

        it('should returns a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result  = curray.slice(7);
            result= Array.from(result);
     
            expectArrays(result, []);

        }); 

            it('should returns a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result  = curray.slice();
            result= Array.from(result);
     
            expectArrays(result, ['ant', 'bison', 'camel', 'duck', 'elephant']);

        }); 

    }); 




    describe('find', function(){
        
        it('should returns the value of the first element in the array that satisfies the provided testing function', function(){
            var curray= new Curray(5, 12, 8, 130, 44);
            var result= curray.find(function(element){
                return element > 100;

            });

            expect (result, 130);
        });

        it('should returns the value of the first element in the array that satisfies the provided testing function', function(){
            var curray= new Curray(5, 12, 8, 130, 44);
            var result= curray.find(function(element){
                return element < 4;

            });

            expect (result, undefined);
        });


    });


    describe('findIndex', function(){

        it('should returns the index of the first element in the array that satisfies the provided testing function', function(){
            var curray = new Curray(5, 12, 8, 130, 44);
            var result = curray.findIndex(function(element){
                return element > 11;
            });
            expect (result, 1);
        });

        it('should returns the value of the first element in the array that satisfies the provided testing function', function(){
            var curray= new Curray(5, 12, 8, 130, 44);
            var result= curray.findIndex(function(element){
                return element < 4;

            });

            expect (result, undefined);
        });

    });

    describe('includes', function(){

        it ('should determines whether an array includes a certain value among its entries', function (){
            var curray = new Curray(1, 2, 3, 4,5);
            var result = curray.includes(3);

            expect(result, true);

        });

        it ('should determines whether an array includes a certain value among its entries', function (){
            var curray = new Curray(1, 2, 3, 4, 5);
            var result = curray.includes(6);

            expect(result, false);

        });

    });

    describe('join', function(){

        it('should creates and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join();

            expect(result, 'Fire,Air,Water');

        }); 

        it('should creates and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join('');

            expect(result, 'FireAirWater');

        });

         it('should creates and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray();
            var result = curray.join('');

            expect(result, '');

        }); 
 
        it('should creates and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join('-');

            expect(result, 'Fire-Air-Water');

        }); 

        it('should creates and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join('Hacker');

            expect(result, 'FireHackerAirHackerWater');

        }); 

        
    });



    describe('some', function(){
        it('should tests whether at least one element in the array passes the test ', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var result = curray.some(function(element){
                return element % 2 === 0;
            });

            expect (result, true);

        });

        it('should tests whether at least one element in the array passes the test ', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var result = curray.some(function(element){
                return element > 8;
            });

            expect (result, false);

        });
    });


    describe('concat', function(){

        it('should merge two or more arrays', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var curray2 = new Curray (6,7,8,9);
            var result = curray.concat(curray2);
            result= Array.from(result);
            

            expectArrays(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

        });

        it('should merge two or more arrays', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var curray2 = new Curray ();
            var result = curray.concat(curray2);
            result= Array.from(result);
            

            expectArrays(result, [1, 2, 3, 4, 5]);

        });

        it('should merge two or more arrays', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var curray2 = new Curray (1,2,4,[5,3]);
            var result = curray.concat(curray2);
            result= Array.from(result);
            

            expectArrays(result, [1, 2, 3, 4, 5,1,2,4,[5,3]]);

        });
    });


    describe('reverse', function(){



        it('should reverse an array', function(){
            var curray = new Curray (1,2,3,4,5);
            var result = curray.reverse();
            result = Array.from(result);

            expectArrays (result, [5,4,3,2,1]);

        });

        it('should reverse an array', function(){
            var curray = new Curray (1,2,3,4,5);
            var result = curray.reverse(1);
            result = Array.from(result);

            expectArrays (result, [5,4,3,2,1]);

        });

         
    });


   
    describe('sort', function() {
        it('should sort the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return a - b;
            });
            var result = Array.from(result);
            expectArrays(result, [1, 2, 3, 3, 4, 5]);
        });
        it('should sort the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return b - a;
            });
            var result = Array.from(result);
            expectArrays(result, [5, 4, 3, 3, 2, 1]);
        });
        
    });

    describe('flat', function(){
        it('should creates a new array with all sub-array elements concatenated into it recursively' , function(){
            var curray = new Curray(1,2,3,[4,5]);
            var result = curray.flat();
            var result = Array.from(result);

            expectArrays(result, [1,2,3,4,5]);
        });

        it('should creates a new array with all sub-array elements concatenated into it recursively', function(){
            var curray = new Curray(1,2,[1,2,[1,2,[1,2]]]);
            var result = curray.flat();
            var result = Array.from(result);
            expectArrays(result, [1,2,1,2,1,2,1,2]);
        });

    });

    describe('map', function(){
        it('should create a new array with the results of calling a provided function on every element', function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.map(function(val){
                return val * 2;
            });

            var result = Array.from(result);
            expectArrays(result, [2,4,6,8,10]);
        });

       
    });
    
   
});