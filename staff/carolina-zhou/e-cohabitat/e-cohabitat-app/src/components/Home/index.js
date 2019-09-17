import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'


function Home({ history }) {

    const [spaces, setSpaces] = useState()

    useEffect(() => {
        (async () =>{
          try {
            const spaces = await logic.retrieveAllSpaces()
            setSpaces(spaces)

          } catch(error) {
            console.log(error.message)
          }
        })()
    },[])

    function handleAddSpace(event) {
        event.preventDefault()

        history.push('/space-register')
    }

    function handleGoToSpace(spaceId) {

        history.push(`/spaces/${spaceId}`)
    }

    return <>

            <section className="home">
                <h1 className="home__title"><span className="home__e">e-</span>cohabitat</h1>
                <h2 className="home__subtitle">Sharing spaces, building communities</h2>

                <div className="home__square">
                    <h3 className="home__space">SPACES</h3>
                    <p className="home__space-add" onClick={handleAddSpace}><i className="fas fa-plus-circle"></i> Add a space</p>
                    
                    {spaces ?
                    <ul className="home__spaces">
                        {spaces.map(space => {
                        return <>
                            <li id="mySpace" className="home__space-image" data={space.id} onClick={() => {handleGoToSpace(space.id)}} >
                                    <div className="home__space-reveal">
                                        <h4 className="home__space-title">{space.title}</h4>
                                        <p className="home__space-subtitle">Type: {space.type}</p>   
                                        <p className="home__space-address">{space.address}</p>                                     
                                    </div>                  
                                    <figure className="home__space-figure">
                                        <img className="home__space-img" alt="kitchen" src={space.picture}/>
                                    </figure>          
                            </li>
                        </>
                        }
                        )} 
                    </ul> 
                    :
                    <p className="home__space-message">You haven't registered any spaces yet</p>
                    }
                </div>
            </section>

    </>
}

export default withRouter(Home)