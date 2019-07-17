/**
 *
 * @param {} result
 * @param {*} expected
 *
 */

function check(result, expected) {
  if (result !== expected)
    console.error(
      "error: result (" +
        result +
        ") does not match expected value (" +
        expected +
        ")"
    );
}
