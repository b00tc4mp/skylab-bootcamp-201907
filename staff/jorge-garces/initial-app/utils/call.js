call = (url, expression) => {
  const request = new XMLHttpRequest()

  request.open('get', url)

  request.onload = () => {
    let results = JSON.parse(request.responseText)

    expression(results)
  }

  request.send()
}

//   function call(url, expression) {
//     var request = new XMLHttpRequest()

//     request.open('get', url);

//     request.onload = function () {
//         var results = JSON.parse(request.responseText);

//         expression(results);
//     };

//     request.send();
// }
