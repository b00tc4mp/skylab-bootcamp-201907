<<<<<<< Updated upstream



// var arr1 = [1, 2, [3, 4]];
// arr1.flat();
// // [1, 2, 3, 4]
//
// var arr2 = [1, 2, [3, 4, [5, 6]]];
// arr2.flat();
// // [1, 2, 3, 4, [5, 6]]
=======
function flatten(array) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
      // pop value from stack
      const next = stack.pop();
      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        stack.push(...next);
      } else {
        res.push(next);
      }
    }
    //reverse to restore input order
    return res.reverse();
  } 
>>>>>>> Stashed changes
