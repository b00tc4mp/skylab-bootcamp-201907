var a = ["color: white", "background-color: green"].join(";");

function check(result, expected) {
  if (result.toString() !== expected.toString()) {
    console.error("error: result does not match expected value");
  } else {
    console.log("%ccheck: OK!", a);
  }
}
