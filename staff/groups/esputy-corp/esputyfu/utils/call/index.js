const call = (url, method, headers, body)  => { 
  validate.string(url, 'url')
  validate.url(url, 'url')
  validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])
  
  return fetch(url, {
      method,
      headers,
      body
    })
    .then(res => res.json())
  }