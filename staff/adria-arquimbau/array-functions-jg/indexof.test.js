suite('indexOf', function() {
  test('get index of an element', function() {
    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

    var result = indexOf(beasts, 'camel');

    check(result, 2);
  });

  test('get index of an element that doesnt exist', function() {
    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

    var result = indexOf(beasts, 'felipe');

    check(result, -1);
  });

  test(
    'input is not an array',
    function() {
      indexOf(1);
    },
    function(error) {
      check(error instanceof TypeError, true);
      check(error.message, '1 cant be a number');
    }
  );

  test(
    'array is not defined',
    function() {
      indexOf();
    },
    function(error) {
      check(error instanceof Error, true);
      check(error.message, 'indexOf is not defined');
    }
  );
});
