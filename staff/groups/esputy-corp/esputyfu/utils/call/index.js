const call = (url, method, headers, body, api)  => { //api should be 'spotify' or 'skylab'
  validate.string(url, 'url')
  validate.url(url, 'url')
  if (api === 'spotify') validate.string(method, 'method', true, ['get'])
  else if (api === 'skylab') validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])
  else throw new Error(`${api} must be "spotify or "skylab"`)
  return fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    })
    .then(res => res.json())
  }