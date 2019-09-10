import React, { useContext, useEffect } from 'react'
import Context from '../context'
import retrieveAllSpaces from '../../logic'
import { withRouter } from 'react-router-dom'

/* import { Redirect} from "react-router-dom"
 */
function SpaceRegister({ history }) {

    const { spaces, setSpaces } = useContext(Context)

    useEffect(() => {

        (async () =>{
          try {
            const spaces = await retrieveAllSpaces()
            
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

    function handleGoToSpace(event) {
        event.preventDefault()

        history.push('/space')
    }

    return <>
        <main class="main"> 
            <section class="home">
                <h1 class="home__title"><span class="main__e">e-</span>cohabitat</h1>
                <h2 class="home__subtitle">Sharing spaces, building communities</h2>

                <h3 class="home__space">SPACES</h3>
                <p class="home__space-add" onClick={handleAddSpace}><i class="fas fa-plus-circle"></i> Add a space</p>
                

                {spaces ?
                <div class="home__spaces">

                    <ul>
                        {spaces.map(item=> {
                        return<>
                            <li onClick={handleGoToSpace} >
                                <div class="home__space-image">
                                    <div class="home__space-reveal">
                                        <h4 class="home__space-title">{item.title}</h4>
                                        <p class="home__space-subtitle">{item.type}</p>
                                        <p>{item.address}</p>
                                    </div>                  
                                    <figure class="home__space-figure">
                                        <a href={`/#/space`}><img class="home__space-img" alt="kitchen image" src={item.picture}/></a>
                                    </figure>          
                                </div>
                            </li>
                        </>
                        }
                        )} 
                    </ul> 

                </div>
                :
                <p>You haven't registered any spaces yet</p>
                }
            </section>
        </main>
    </>
}

export default withRouter(SpaceRegister)



/* {spaces ?
    <div class="home__spaces">

        <div class="home__space-image">
            <div class="home__space-reveal">
                <h4 class="home__space-title">Kitchen</h4>
                <p class="home__space-subtitle">bla bla bla</p>
            </div>                  
            <figure class="home__space-figure">
                <a href={`/#/space`}><img class="home__space-img" alt="kitchen image" src={require('../../img/space-a.jpg')}/></a>
            </figure>          
        </div>

    </div>
    :
    <p>You haven't registered any spaces yet</p>
    }

function Articles() {
    
    const { setCredentials, setView, view, articles, setArticles, setArticleQuery} = useContext(Context)

    useEffect(() => {
        (async () =>{
          try{
            const articles = await retrieveAllArticles()
            
            setArticles(articles)
          }catch(error){
            console.log(error.message)
          }
        })()
           
  },[])
  

    return <>
    {view==="articlesDetail" && <Redirect to="/articleDetail"/>}
    {articles &&
            <ul>
                 {articles.map(item=> {
                   return<>
                    <ul className='article'onClick={event => {
                event.preventDefault()
                setView("articlesDetail")
                setArticleQuery(item._id)
            }} >
                    <li className="article-title">{item.title}</li>
                    <li className="article-ref">{item.ref}</li>
                    <li className="article-image"><img src={item.img} /></li>
                    <li className="article-quantity">Stock: {item.quantity} uds</li>
                    </ul>
                   </>
                 }
                 
                  )} 
            </ul> 
    }     
    </>
}

export default Articles */