function indexOf(array, name) {
    for (var i = 0; i < array.length; i++) {
      if (name === array[i]) {
        return i;
        }
    }
    return -1;
  }
  