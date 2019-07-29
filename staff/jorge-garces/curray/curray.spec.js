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

  describe('concat', function() {
    it('should merge two arrays', function() {
      var curray = new Curray(1, 2, 3);
      var curray2 = new Curray(4, 5, 6);

      var result = curray.concat(curray2);
      result = Array.from(result);

      expect(result.length).toBe(6);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('every', function() {
    it('should check all elements in curray pass the test', function() {
      var curray = new Curray(20, 25, 16, 35);

      var result = curray.every(function(value) {
        return value > 15;
      });

      expect(result).toBe(true);
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

  describe('reverse', function() {
    it('should reverse an array in place', function() {
      var curray = new Curray(1, 2, 3, 4);
      var result = curray.reverse();
      curray = result;
      curray = Array.from(curray);

      expect(curray.length).toEqual(4);
      expect(curray).toEqual([4, 3, 2, 1]);
    });
  });

  describe('forEach', function() {
    it('should output each element index and curray', function() {
      var curray = new Curray('a', 'b', 'c');

      var outputs = [];

      curray.forEach(function(element, index, curray) {
        outputs.push([element, index, curray]);
      });

      expect(outputs).toEqual([
        ['a', 0, curray],
        ['b', 1, curray],
        ['c', 2, curray]
      ]);
    });

    it('should fail with no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.forEach();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function forEach'
      );
    });
  });

  describe('indexOf', function() {
    it('should get index of an element', function() {
      var curray = new Curray('ant', 'bison', 'camel', 'duck', 'bison');

      var result = curray.indexOf('camel');

      expect(result).toBe(2);
    });
  });

  describe('reduce', function() {
    it('should add all items in array of numbers', function() {
      var curray = new Curray(1, 2, 3, 4);

      var result = curray.reduce(function(accumulator, val) {
        return accumulator + val;
      }, 10);
      expect(result).toBe(20);
    });
  });

  describe('join', function() {
    it('should join all elements in curray with a comma', function() {
      var curray = new Curray('Fire', 'Air', 'Water');

      var result = curray.join();

      expect(result).toBe('Fire,Air,Water');
    });
  });

  describe('includes', function() {
    it('should check if value is in curray', function() {
      var curray = new Curray(1, 2, 3, 4);
      var result = curray.includes(4);
      expect(result).toBe(true);
    });
  });

  describe('map', function() {
    it('should return a new curray filtered by expression', function() {
      var curray = new Curray(1, 2, 3, 4);
      var coeficient = 10;

      var result = curray.map(function(value) {
        return value * coeficient;
      });

      var expected = [10, 20, 30, 40];

      for (var i = 0; i < expected.length; i++) {
        expect(result[i]).toBe(expected[i]);
      }
    });
  });

  describe('unshift', function() {
    it('should add elements to the beginning of an array and return new size', function() {
      var curray = new Curray(40, 50, 60);
      var result = curray.unshift(10, 20, 30);

      expect(result).toEqual(6);
      expect(Array.from(curray)).toEqual([10, 20, 30, 40, 50, 60]);
    });
  });

  describe('sort', function() {
    it('should sort the elements of an array and returns the sorted array', function() {
      var curray = new Curray(4, 2, 1, 3, 5);
      var result = curray.sort(function(a, b) {
        return a - b;
      });

      expect(result).toEqual(new Curray(1, 2, 3, 4, 5));
    });

    it('should sort the elements of an array BACKWARDS and returns the sorted array', function() {
      var curray = new Curray(4, 2, 1, 3, 5);
      var result = curray.sort(function(a, b) {
        return b - a;
      });

      expect(result).toEqual(new Curray(5, 4, 3, 2, 1));
    });

    it('should sort the elements of an array and return the sorted array. Case: words', function() {
      var curray = new Curray('d', 'a', 'c', 'b', 'e');
      var result = curray.sort(function(a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });

      console.log(result);
      expect(result).toEqual(new Curray('a', 'b', 'c', 'd', 'e'));
    });
  });

  describe('flat', function() {
    it('should flatten a curray/one level', function() {
      var curray1 = new Curray(
        1,
        2,
        3,
        new Curray('a', 'b', 'c', new Curray(true, false))
      );

      var result = curray1.flat();
      expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', new Curray(true, false)]);
    });
    it('should flatten a curray/two level', function() {
      var curray1 = new Curray();
      curray1 = [1, 2, 3, ['a', 'b', 'c', [true, false]]];
      var result = curray1.flat(2);
      expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false]);
    });
  });

  describe('copyWithin', function() {
    it('should copy part of the curray whouth changing the lenght', function() {
      var curray1 = new Curray();

      curray1 = [1, 2, 3];

      var result = curray1.copyWithin(1, 2);
      expect(result).toEqual([1, 3, 3]);
    });
    it('should fail on no arguments', function() {
      var curray1 = new Curray();

      expect(function() {
        curray1.copyWithin();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function copyWithin'
      );
    });
  });

  describe('arrayOf', function() {
    it('should introduce the arguments into a new curray', function() {
      var curray = new Curray(1, 2, 3, 'hello', {}, NaN);

      var result = curray.arrayOf();
      expect(Array.from(result)).toEqual([1, 2, 3, 'hello', {}, NaN]);
    });
  });

  describe('fill', function() {
    it('should fill all the items with the input introduced to and from the desired start index', function() {
      var curray = new Curray(1, 2, 3, 4, 5);

      var result = curray.fill(5, 1);

      result = Array.from(result);
      expect(result).toEqual([1, 5, 5, 5, 5]);
    });

    it('fill all the items with the input passed to a fill from the start index you passed', function() {
      var curray = new Curray(1, 2, 3, 4, 5);

      var result = curray.fill(5);
      var expected = [5, 5, 5, 5, 5];

      var arrResult = Array.from(result);
      expect(arrResult).toEqual(expected);
    });
  });

  describe('splice', function() {
    it('should delete some elements and add spme others', function() {
      var curray = new Curray(1, 2, 3, 4, 5, 6);
      var result = curray.splice(2, 1, 'a', 'b');

      expect(result).toEqual([1, 2, 'a', 'b', 4, 5, 6]);
    });

    it('should return an empty curray', function() {
      var curray = new Curray(1, 2, 3, 4, 5, 6);
      var result = curray.splice();

      expect(result).toEqual([]);
    });
  });

  describe('slice', function() {
    // it('should return a determined slice of curray, case 1', function() {
    //     var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
    //     var result = curray.slice(1, 3);

    //     expect(result).toEqual(["orange", "lemon"]);
    // });

    // it('should return a determined slice of curray, case 2', function() {
    //     var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
    //     var result = curray.slice(2);

    //     expect(result).toEqual(["lemon", "cherry", "avocado", "apple"]);
    // });

    // it('should return a determined slice of curray, case 3', function() {
    //     var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
    //     var result = curray.slice(-3);

    //     expect(result).toEqual(["cherry", "avocado", "apple"]);
    // });

    // it('should return a the whole curray', function() {
    //     var curray = new Curray ("banana", "orange", "lemon", "cherry", "avocado", "apple");
    //     var result = curray.slice();

    //     expect(result).toEqual(["banana", "orange", "lemon", "cherry", "avocado", "apple"]);
    // });

    it('should break if first is not a number', function() {
      var curray = new Curray();
      expect(function() {
        curray.slice('a', 6);
      }).toThrowError(TypeError, 'a is not a number');
    });

    it('should should break if final is not undefined and is not a number', function() {
      var curray = new Curray();
      expect(function() {
        curray.slice(5, 'b');
      }).toThrowError(TypeError, 'b is not a number');
    });
  });

  describe('reduceRight', function() {
    it('should apply a function against an accumulator and each value of curray from right to left', function() {
      var curray = new Curray('A', 'B', 'C');
      var result = '';
      var expected = 'CBA';

      result = curray.reduceRight(function(empty, current) {
        return empty + current;
      });
      for (var i in result) {
        expect(result[i], expected[i]);
      }

      expect(result).toEqual(expected);
    });

    it('should fail on no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.reduceRight();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function reduceRight'
      );
    });

    it('should break when expression is not a function', function() {
      var curray = new Curray();
      expect(function() {
        curray.reduceRight('x');
      }).toThrowError(TypeError, 'x is not a function');
    });
  });

  describe('lastIndexOf', function() {
    it('should find last index of introduced element', function() {
      var curray = new Curray('a', 'b', 'a', 'c', 'a', 'e', 'f');
      var result = curray.lastIndexOf('a');

      expect(result).toEqual(4);
    });

    it('should fail on no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.lastIndexOf();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function lastIndexOf'
      );
    });
  });

  describe('filter', function() {
    it('should filter all the items who accomplish the condition introduced, case 1', function() {
      var curray = new Curray('hol', 'adi', 'guanchope', 'cosita', 'manomens');
      var result = curray.filter(function(x) {
        return x.length >= 4;
      });

      expect(result).toEqual(['guanchope', 'cosita', 'manomens']);
    });

    it('should filter all the items who accomplish the condition introduced, case 2', function() {
      var curray = new Curray(1, 2, 3, 4, 5, 6);
      var result = curray.filter(function(x) {
        return x < 4;
      });

      expect(result).toEqual([1, 2, 3]);
    });

    it('should filter all the items who accomplish the condition introduced, case ', function() {
      var curray = new Curray(1, 2, 3, 4);
      var result = curray.filter(function(x) {
        return x > 5;
      });

      expect(result).toEqual([]);
    });

    it('should fail on no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.filter();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function filter'
      );
    });

    it('should break when expression is not a function', function() {
      var curray = new Curray();
      expect(function() {
        curray.filter('x');
      }).toThrowError(TypeError, 'x is not a function');
    });
  });

  describe('find', function() {
    it('should return the value of the first element in curray that satisfies the condition', function() {
      var curray = new Curray(1, 2, 3, 4, 5);
      var result = curray.find(function(element) {
        return element < 10;
      });

      expect(result).toEqual(1);
    });

    it('should fail on no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.find();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function find'
      );
    });
  });

  describe('fill', function() {
    it('should fill all the items with the input introduced to and from the desired start index', function() {
      var curray = new Curray(1, 2, 3, 4, 5);
      var result = curray.fill(5, 1);

      expect(result).toEqual([1, 5, 5, 5, 5]);
    });

    it('should fill all the items with the input introduced', function() {
      var curray = new Curray(1, 2, 3, 4, 5);
      var result = curray.fill(5);

      expect(result).toEqual([5, 5, 5, 5, 5]);
    });

    it('should fail on no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.fill();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function fill'
      );
    });
  });

  describe('some', function() {
    it('should iterate curray and evaluate an expression on at least one of its values', function() {
      var curray = new Curray(1, 3, 5, 7, 11, 15);
      var result = curray.some(function(element) {
        return element > 10;
      });

      expect(result).toEqual(true);
    });

    it('should fail on no arguments', function() {
      var curray = new Curray();

      expect(function() {
        curray.some();
      }).toThrowError(
        TypeError,
        'missing argument 0 when calling function some'
      );
    });

    it('should break when expression is not a function', function() {
      var curray = new Curray();
      expect(function() {
        curray.some('x');
      }).toThrowError(TypeError, 'x is not a function');
    });
  });

  describe('shift', function() {
    it('should remove the first element from curray', function() {
      var curray = new Curray(1, 2, 3);
      var result = curray.shift();

      expect(result).toEqual(1);
    });
  });
});
