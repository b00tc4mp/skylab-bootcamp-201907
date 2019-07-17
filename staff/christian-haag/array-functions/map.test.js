console.log("TEST: map");

/*------------------Check-Ok!--------------*/
var array = [1, 2, 3];

var coeficient = 10;

var result = map(array, function(value) {
  return value * coeficient;
});

checkAndLogError(result, [10, 20, 30]);

var arrayTwo = ["1", "2", "3"];

var result1 = map(arrayTwo, function(value) {
  return "<" + value + ">";
});
checkAndLogError(result1, ["<1>", "<2>", "<3>"]);

var arrayThree = [1, 2, 3];

var result3 = map(arrayThree, function(value, index, arrayThree) {
  return value + "-" + index + "-" + arrayThree;
});

checkAndLogError(result3, ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);

/*------------------------------------------------------------*/
console.log("--Check-1------No-Match--------------------");

var arrayCheck = [1, 2, 3];

var coeficient = 10;

var result = map(array, function(value) {
  return value * coeficient;
});

checkAndLogError(result, [11, 20, 30]);

/*------------------------------------------------------*/
console.log("--Check-2------No-Match--------------------");

var arrayTwoCheck = ["1", "2", "3"];

var result1 = map(arrayTwo, function(value) {
  return "<" + value + ">";
});
checkAndLogError(result1, ["<1.", "<2>", "<3>"]);

/*------------------------------------------------------*/
console.log("--Check-3------No-Match--------------------");

var arrayThreeCheck = [1, 2, 3];

var result3 = map(arrayThree, function(value, index, arrayThree) {
  return value + "-" + index + "-" + arrayThree;
});

checkAndLogError(result3, ["1aaa-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);

/*------------------------------------------------------*/
console.log("--test-1-----No-Function--------------------");
try {
  map(array, Date());
} catch (error) {
  console.error(error);
}
/*------------------------------------------------------*/
console.log("--test-2-----No Array--------------------");
try {
  map(1, function(value) {
    return "<" + value + ">";
  });
} catch (error) {
  console.error(error);
  checkAndLogError(error, TypeError(1 + " is not an array"));
}
/*------------------------------------------------------*/
console.log("--test-3------No Arguments--------------------");
try {
  map(/*arrayThree, function(value, index, arrayThree*/); /*{
    return value + "-" + index + "-" + arrayThree;
  });*/
} catch (error) {
  console.error(error);
}
