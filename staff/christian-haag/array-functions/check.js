var a = ["background-color: green", "white"].join(";");

function checkAndLogError(result, expected) {
  if (result.toString() !== expected.toString()) {
    console.error(
      "error: result (" +
        result +
        ") does not match expected value (" +
        expected +
        ")"
    );
  } else {
    console.log(result + " %c Passed!", a);
  }
}
