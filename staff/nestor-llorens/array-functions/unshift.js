  'use strict'
  
  function unshift(array) {
      var add = arguments.length - 1;
      for (var i = array.length-1; i >= 0; i--) array[i+add] = arr[i];
      for (var j=1; j < arguments.length; j++) array[j - 1] = arguments[j];
      return array.length;
  }