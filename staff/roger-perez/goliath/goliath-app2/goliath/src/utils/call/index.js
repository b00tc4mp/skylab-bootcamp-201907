import validate from '../validate/index'

function call(url, method = "get", headers, body) {
    validate.string(method, "method", true, [
      "get",
      "post",
      "put",
      "patch",
      "delete"
    ]);

    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          return res.json().then(json => {
            return Promise.reject(json.error);
          });
        } else {
          return res.json().then(json => {
            return json;
          });
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  export default call