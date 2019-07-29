'use strict';

describe('Curray', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
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


    describe('fill', function() {
        it('fill all the items with the input passed to a fill from the start index you passed', function () {
           
            var curray = new Curray(1, 2, 3, 4, 5);
    
            var result = curray.fill(5, 1);
            
            var result = Array.from(result)
            expect(result).toEqual([1, 5, 5, 5, 5]); 

        });
        
         it ('fill all the items with the input passed to a fill from the start index you passed', function(){
   
            var curray = new Curray(1, 2, 3, 4, 5);
            
            var result = curray.fill(5);
            var expected =  [5, 5, 5, 5, 5];

            //we do a for loop in order to compare the items of the arrays
            //because with expectArrays we can't compare arrays with Objects(result is an Object)
            var arrResult = Array.from(result)
            expect(arrResult).toEqual(expected); 

          
         });

        //error case with fill
        it('has no arguments', function (){
            var curray = new Curray();
           
            expect(function(){
                curray.fill();
            }).toThrowError(TypeError,'missing argument 0 when calling function fill');
           
            
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
            expect(arrResult).toEqual(expected); 

            
    
        });

        it('filter all the items who accomplish the condition passed as a function', function (){

            var curray = new Curray (1,2,3,4,5,6);
                                
            var result2 = curray.filter(function(val){
                return val < 4;
            });

            var expected=[1,2,3];
            var arrResult = Array.from(result2)
            expect(arrResult).toEqual(expected); 

            
        });
    


        it('has no arguments', function (){
            var curray = new Curray();

            expect(function(){
                curray.filter();
            }).toThrowError(TypeError,'missing argument 0 when calling function filter');
  
        });
    
    });
    

    describe('every', function(){
        
        it('check if the value passed is the same of all the items of an array', function(){
            var curray = new Curray ('a', 'a', 'a');

            var result = curray.every(function(val){
                return val === 'a';
            });
    
            expect(result).toBe(true);
        });


        it('check if the value passed is the same of all the items of an array', function(){

        var curray =new Curray (1,2,3,4)
        var result2 = curray.every(function(val){
            return val === 1;
        });
        
        expect(result2).toBe(false);

    });

        it('has no arguments', function (){
            var curray = new Curray();

            expect(function(){
                curray.every();
            }).toThrowError(TypeError,'missing argument 0 when calling function every');
            
        });


    });


    describe('shift', function(){
        it('should delete the first item of the array passed', function(){
            var curray= new Curray(1,2,3,4,5);
            var result = curray.shift();

            expect(result).toBe(1);

        });

        it('should delete the first item of the array passed', function(){
            var curray = new Curray('a', 'b', 'c','d');
            var result = curray.shift();

            expect(result).toBe('a');

        });

        it ('should delete the first item of the array passed', function(){
            var curray = new Curray();
            var result = curray.shift();

            expect(result).toBeUndefined();
        });

        

    });


    describe('unshift', function(){

        it('should add items to an array and return the length of the array ', function(){
            var curray = new Curray(1,2,3);
    
            var result = curray.unshift(4,5);

            expect(result).toBe(5);

        });


        it('should add items to an array and return the length of the array ', function(){
            var curray = new Curray(1,2,3);
            var result = curray.unshift(4,5,'d',7,8,9);
           
            expect(result).toBe(9);
                      
        });

        it('should add items to an array and return the length of the array ', function(){
            var curray = new Curray(1,2,3);
            var result = curray.unshift();

            expect(result).toBe(3);

        });

    });
  
   

    describe('IndexOf', function(){

        it('should find the index of the value passed to the method', function(){
          var curray = new Curray(1,2,3,4,5);
          var result = curray.indexOf(2);

          expect(result).toBe(1);
      });  

      it('should find the index of the value passed to the method', function(){
        var curray = new Curray(1,2,3,4,5);
        var result = curray.lastIndexOf(6);

        expect(result).toBe(-1);

    });

    }); 


    describe('lastIndexOf', function(){

          it('should find the index of the value passed to the method', function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.lastIndexOf(2);

            expect(result).toBe(1);

        });  
        it('should find the index of the value passed to the method', function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.lastIndexOf(6);

            expect(result).toBe(-1); 

        });

        it('should find the index of the value passed to the method', function(){
            var curray = new Curray(1,2,3,4,5,6,7,8,9);
            var result = curray.lastIndexOf(3,2);

            expect(result).toBe(2);

        }); 


    });

    describe('slice', function(){

        it('should return a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result = curray.slice(2);
            result = Array.from(result); 
            var expected=  ['camel', 'duck', 'elephant'];
         
            expect(result).toEqual(expected);
           
        });

         it('should return a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result  = curray.slice(2,4);
            result= Array.from(result);
           
            expect(result).toEqual(["camel", "duck"]);
            

        }); 

        it('should return a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result  = curray.slice(7);
            result= Array.from(result);
     
            expect(result).toEqual([]);
         
        }); 

            it('should return a new array with the portion specified', function(){
            var curray= new Curray('ant', 'bison', 'camel', 'duck', 'elephant');
            var result  = curray.slice();
            result= Array.from(result);
     
            expect(result).toEqual(['ant', 'bison', 'camel', 'duck', 'elephant']);

        }); 

    }); 




    describe('find', function(){
        
        it('should return the value of the first element in the array that satisfies the provided testing function', function(){
            var curray= new Curray(5, 12, 8, 130, 44);
            var result= curray.find(function(element){
                return element > 100;

            });
            expect(result).toBe(130);
           
        });

        it('should return the value of the first element in the array that satisfies the provided testing function', function(){
            var curray= new Curray(5, 12, 8, 130, 44);
            var result= curray.find(function(element){
                return element < 4;

            });
            expect(result).toBeUndefined();
        });

        it('has no arguments', function (){
            var curray = new Curray();
           
            expect(function(){
                curray.find();
            }).toThrowError(TypeError,'undefined is not a function');
           
            
        });


    });


    describe('findIndex', function(){

        it('should return the index of the first element in the array that satisfies the provided testing function', function(){
            var curray = new Curray(5, 12, 8, 130, 44);
            var result = curray.findIndex(function(element){
                return element > 11;
            });
            expect(result).toBe(1);
        });

        it('should return the value of the first element in the array that satisfies the provided testing function', function(){
            var curray= new Curray(5, 12, 8, 130, 44);
            var result= curray.findIndex(function(element){
                return element < 4;

            });
            expect(result).toBeUndefined();
        });

        it('has no arguments', function (){
            var curray = new Curray();
           
            expect(function(){
                curray.findIndex();
            }).toThrowError(TypeError,'undefined is not a function');
           
            
        });

    });

    describe('includes', function(){

        it ('should determine whether an array includes a certain value among its entries', function (){
            var curray = new Curray(1, 2, 3, 4,5);
            var result = curray.includes(3);

            expect(result).toBe(true);

        });

        it ('should determine whether an array includes a certain value among its entries', function (){
            var curray = new Curray(1, 2, 3, 4, 5);
            var result = curray.includes(6);

            expect(result).toBe(false);
        });

    });

    describe('join', function(){

        it('should create and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join();

            expect(result).toEqual('Fire,Air,Water');
        }); 

        it('should create and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join('');

            expect(result).toEqual('FireAirWater');
        });

         it('should create and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray();
            var result = curray.join('');

            expect(result).toEqual('');

        }); 
 
        it('should create and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join('-');

            expect(result).toEqual('Fire-Air-Water');
        }); 

        it('should create and returns a new string by concatenating all of the elements in an array', function(){
            var curray = new Curray('Fire', 'Air', 'Water');
            var result = curray.join('Hacker');

            expect(result).toEqual('FireHackerAirHackerWater');

        }); 

        
    });



    describe('some', function(){
        it('should test whether at least one element in the array passes the test ', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var result = curray.some(function(element){
                return element % 2 === 0;
            });
            expect(result).toBe(true);

        });

        it('should test whether at least one element in the array passes the test ', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var result = curray.some(function(element){
                return element > 8;
            });
            expect(result).toBe(false);

        });
        it('has no arguments', function (){
            var curray = new Curray();
           
            expect(function(){
                curray.some();
            }).toThrowError(TypeError,'undefined is not a function');
           
            
        });

    });


    describe('concat', function(){

        it('should merge two or more arrays', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var curray2 = new Curray (6,7,8,9);
            var result = curray.concat(curray2);
            result= Array.from(result);
            
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('should merge two or more arrays', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var curray2 = new Curray ();
            var result = curray.concat(curray2);
            result= Array.from(result);
            
            expect(result).toEqual([1, 2, 3, 4,5]);

        });

        it('should merge two or more arrays', function(){
            var curray = new Curray (1, 2, 3, 4, 5);
            var curray2 = new Curray (1,2,4,[5,3]);
            var result = curray.concat(curray2);
            result= Array.from(result);
            
            expect(result).toEqual([1, 2, 3, 4, 5,1,2,4,[5,3]]);

        });
    });


    describe('reverse', function(){



        it('should reverse an array', function(){
            var curray = new Curray (1,2,3,4,5);
            var result = curray.reverse();
            result = Array.from(result);

            expect(result).toEqual([5,4,3,2,1]);

        });

        it('should reverse an array', function(){
            var curray = new Curray (1,2,3,4,5);
            var result = curray.reverse(1);
            result = Array.from(result);

            expect(result).toEqual([5,4,3,2,1]);

        });

         
    });

    describe('sort', function() {
        it('should sort the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return a - b;
            });
            var result = Array.from(result);
            expect(result).toEqual([1, 2, 3, 3, 4, 5]);
        });
        it('should sort the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return b - a;
            });
            var result = Array.from(result);
            expect(result).toEqual([5, 4, 3, 3, 2, 1]);
        });

        it('there is not a function', function (){
            var curray = new Curray();
           
            expect(function(){
                curray.sort();
            }).toThrowError(TypeError,'undefined is not defined');
           
            
        });


    });

    describe('flat', function(){
        it('should create a new array with all sub-array elements concatenated into it recursively' , function(){
            var curray = new Curray(1,2,3,[4,5]);
            var result = curray.flat();
            var result = Array.from(result);

            expect(result).toEqual([1,2,3,4,5]);
        }); 

        it('should create a new array with all sub-array elements concatenated into it recursively', function(){
            var curray = new Curray(1,2,[1,2,[1,2]]);
            var result = curray.flat(2);
            var result = Array.from(result);
            expect(result).toEqual([1,2,1,2,1,2]);
        });

    });

    describe('map', function(){
        it('should create a new array with the results of calling a provided function on every element', function(){
            var curray = new Curray(1,2,3,4,5);
            var result = curray.map(function(val){
                return val * 2;
            });

            var result = Array.from(result);
            expect(result).toEqual([2,4,6,8,10]);
        });

       
    });
    

    describe('reduce', function(){
        it('should first maps each element using a mapping function, then flattens the result into a new array. It is identical to a map() followed by a flat() of depth 1, but flatMap() is often quite useful, as merging both into one method is slightly more efficient. CASE: sum' , function(){
            var curray = new Curray(1,2,3);
            var result = curray.reduce(function(acumulator, currentValue, index, curray) {
                return acumulator + currentValue;
            });
            expect(result).toBe(6);
        });

        it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value. CASE: rest' , function(){
            var curray = new Curray(6,2,1);
            var result = curray.reduce(function(acumulator, currentValue, index, curray) {
                return acumulator - currentValue;
            });
            expect(result).toBe(3);
        });

        it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value. CASE: mult' , function(){
            var curray = new Curray(1,2,3);
            var result = curray.reduce(function(acumulator, currentValue, index, curray) {
                return acumulator * currentValue;
            });
            expect(result).toBe(6);
        });

        it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value. CASE: div' , function(){
            var curray = new Curray(12,2,2);
            var result = curray.reduce(function(acumulator, currentValue, index, curray) {
                return acumulator / currentValue;
            });
            expect(result).toBe(3);
        });
    
    });

    describe('splice', function() {
        it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: delete', function() {
            var curray = new Curray(5, 3, 6, 2, 1, 4);
            var result = curray.splice(2, 2);
            var currayArr = Array.from(curray)
            expect(result).toEqual([6, 2]);
            expect(currayArr).toEqual([5, 3, 1, 4]);

        });

        it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: Remove and adds the elements', function() {
            var curray = new Curray('Pepito', 'Manolito', 'Luisito', 'Felipito', 'Jorgito', 'Paquito');
            var result = curray.splice(2, 1, 'Fulanito');
            var resultArr = Array.from(curray);
            expect(result).toEqual(['Fulanito']);
            expect(resultArr).toEqual(['Pepito', 'Manolito', 'Fulanito', 'Felipito', 'Jorgito', 'Paquito']);
        });

        it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: value delete 0', function() {
            var curray = new Curray('Jan', 'March', 'April', 'June');
            var result = curray.splice(1, 0, 'Feb');
            var resultArr = Array.from(curray);
            expect(result).toEqual([]);
            expect(resultArr).toEqual(['Jan', 'Feb', 'March', 'April', 'June']);
        });
    });

    
    describe('copyWithin', function() {
        it('should copies part of a Curray to another location in the same Curray', function() {
            var curray = new Curray(0, 1, 2, 3, 4, 5, 6, 7);
            var result = curray.copyWithin(0, 2, 4);
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([2, 3, 2, 3, 4, 5, 6, 7]);
        });
    });

    describe('reduceRight', function() {
        it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: sum', function() {
            var curray = new Curray(1,2,3);
            var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
                return acumulator + currentValue;
            });
            expect(result).toBe(6);
        });

        it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: rest', function() {
            var curray = new Curray(1,2,6);
            var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
                return acumulator - currentValue;
            });
            expect(result).toBe(3);
        });

        it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: mult', function() {
            var curray = new Curray(1,2,3);
            var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
                return acumulator * currentValue;
            });

            expect(result).toBe(6);
        });

        it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: div', function() {
            var curray = new Curray(2,2,12);
            var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
                return acumulator / currentValue;
            });

            expect(result).toBe(3);
        });

    });
  
   
});