var allArray = [1, 2, 3, 4, 5];
var x = 2;

function includes() {
    for (i = 0; i < allArray.length; i++) {
        if ([i] == x) {
            console.log("true");
        } else {
            console.log("false");
        }
    }
}
includes(x);



var allArray = [1, 2, 3, 4, 5];

function includesSwitch(x) {
for (i = 0; i < allArray.length; i++) {
  switch(true) {
    case [i] == x:
      console.log("true");
      break;
    case [i] != x:
      console.log("false");
      break;
  }
}} includesSwitch(2);