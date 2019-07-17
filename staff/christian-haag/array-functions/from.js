function from(string) {
  if (arguments.length === 0)
    throw TypeError("missing argument 0 when calling function Map");

  if (string.lenght === 0) throw TypeError(string + " empty");
  if (!(string instanceof Array)) throw TypeError(string + " is not an array");

  var string = arr[0];
  var newArr = string.split("");
  return newArr;
}
