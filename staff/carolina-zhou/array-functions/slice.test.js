console.log("TEST slice");

var array = ["banana", "orange", "lemon", "cherry", "avocado", "apple"];

result = slice(array, 1, 3);
check(result, ['orange', 'lemon']);
check(array, ['banana', 'orange', 'lemon', 'cherry', 'avocado', 'apple']);

result = slice(array, 2);
check(result, ['lemon', 'cherry', 'avocado', 'apple']);
check(array, ['banana', 'orange', 'lemon', 'cherry', 'avocado', 'apple']);

result = slice(array, -3);
check(result, ['cherry', 'avocado', 'apple']);
check(array, ['banana', 'orange', 'lemon', 'cherry', 'avocado', 'apple']);