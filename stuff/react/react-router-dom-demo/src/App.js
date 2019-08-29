import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search'
import Results from './Results'
import queryString from 'query-string'
import Detail from './Detail'

import { withRouter, Route } from 'react-router-dom'

function App(props) {
  const [query, setQuery] = useState()

  function handleSearch(query) {
    setQuery(query)

    props.history.push(`/search?q=${query}`)
  }

  useEffect(() => {
    const { q: query } = queryString.parse(props.location.search)

    setQuery(query)
  }, [])



  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Search onSearch={handleSearch} />
      <Route path="/search" render={() => <Results query={query} />} />
      <Route path="/ducks/:id" render={props => <Detail id={props.match.params.id} />} />
    </div>
  );
}

export default withRouter(App);
