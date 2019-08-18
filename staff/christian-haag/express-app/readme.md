## Process-app

### exercice

<b>Create a web-app server that renders a form in default path '/' and accepts a query via that form to search ducks through ducks api, and returns the results in ul-li.</b>

We download all de modules we need, deconstructing the `process.argv` and save the object `express()` to a the variable <b>app</b> for accessing to its properties and methods:

```js
const express = require('express')
const http = require('http')

const { argv: [, , port] } = process
const app = express()
```
We use the property `get` on <b>app</b>, which accepts as first parameter a <b>path</b>, and from there on it accepts any kind of <b>handler</b> parameters.

```js
(property) Application.get: (path: PathParams, ...handlers: RequestHandler[]) => Express (+3 overloads)
```
As handler, we use a callback as parameter which contains the parameter response. Inside the callback we had de property send to response to print anything what is inside to the browser. In our case it's a search bar.

```js
app.get('/', (req, res) => {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
    </form>`)
})
```
The html form element we have created has the property action on where we inform the path or entry point. Every time that endpoint is called the next function we have created is executed.

```js
app.get('/search', (req, response) => {
     const query = req.query.q
```
We also define a constant variable that holds the query value we are searching for. We may destructure de constant, like the following:

```const { query: {q}} = req```

Inside `app.get` we call `http.get` and fetch the duck-API pasing our query as endpoint. The callback only pass the parameter <b>response</b>, which is the one we need.

```js
http.get(`http://duckling-api.herokuapp.com/api/search?q=${query}`, res => {
        res.on('error', error => {throw error})   

        let data = ''
        
        res.on('data', chunk => data += chunk)
```

Inside we handle with the `.on` property the data which we store in <b>data</b>. We recieve the data in chunks.







