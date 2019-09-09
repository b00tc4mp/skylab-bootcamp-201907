import Search from '../Search'
import React, {useState, useEffect} from 'react'
import { withRouter, Route } from 'react-router-dom'


function Card(props) {

    const [query, setQuery] = useState()
  
    function handleSearch(query) {
      setQuery(query)
  
      props.history.push(`/search?q=${query}`)
    }
  
    // useEffect(() => {
    //   const { q: query } = queryString.parse(props.location.search)
  
    //   setQuery(query)
    // }, [])
  

    return (
        
    <div>
      <Search onSearch={handleSearch} />
      
    </div>
  );
}

export default withRouter(Card)