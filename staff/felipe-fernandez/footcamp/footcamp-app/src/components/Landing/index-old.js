import React, { useState } from 'react'
import Context from '../Context'


export default function App () {
  
  const [credentials, setCredentials] = useState(undefined)
 
    return <div className="App">
      <Context.Provider value={{ credentials, setCredentials }} ></Context.Provider>
      </div>
}
