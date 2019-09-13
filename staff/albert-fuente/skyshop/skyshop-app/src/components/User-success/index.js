/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'


function Checkout() {
    
  
    return <>
        <p className="formPanel">{'Thanks for shopping :)' }</p>
        <p className="formPanel">Continue shopping:</p>

        
        <div>
            <a href='/#/' className="formPanel-submit-explore" >Explore</a>
        </div>
        
    </>
}

export default Checkout