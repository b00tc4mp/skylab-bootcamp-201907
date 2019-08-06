function Collections(props){
    
    return <>  
     <h3>Collections</h3>
    {/* List of items by genre. If you click on a genre appears a list of movies of this genre  */}     <ul className="container">
       
         <li>
            <a href="" data-id={28} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
        }}>Action</a>
        </li>
        <li>
            <a href="" data-id={35} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}>Comedy</a>
        </li>
        <li>
            <a href="" data-id={18} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}>Drama</a>
        </li>
        <li>     
            <a href="" data-id={878} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}>SciFy</a>
        </li>
        <li>
            <a href="" data-id={37} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}>Western</a>
        </li>
        <li>       
           <a href="" data-id={53} onClick={event=>{
           const { target: { dataset: { id: query } }  } = event
           event.preventDefault()
           props.onCollection(query)
           }}>Thriller</a>
        </li>
    
    </ul> 
    </>
}