import React from 'react'
import { withRouter } from "react-router-dom"
import InitialHeader from '../InitialHeader'
import backimage from '../../style/img/pitch-blur.jpeg'

function RegisterSuccess(props){
    
    const { history } = props
    
    return (
        <div>
          <section className="register-successful">
          <img className="register-successful__image" src={backimage}/>
            <InitialHeader />
            
            <h2>REGISTER SUCCESS</h2>
            <div className="register-successful__content">
            

            
            <a className="register-successful__link"href="#" onClick={event => {
                event.preventDefault()
                history.push('/login')
            }}>Go to Login</a>

          <a href="#" onClick={event => {
            event.preventDefault()
            history.push('/')
              }}> 
              <i className="fas fa-arrow-circle-left fa-2x"> </i>
            </a>


         </div>
         </section>
       </div>
        
    )
}

export default withRouter(RegisterSuccess)