var object = [];
var newArray = [];

function keys(object) {
  if (arguments.length === 0) throw TypeError('missing argument when calling function keys');

  for (var i = 0; i < object.length; i++) {
    newArray.push(i);
  }
}