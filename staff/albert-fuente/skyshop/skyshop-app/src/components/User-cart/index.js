/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect,useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"



function UserCart() {
    const { credentials, setView, view, products, setProducts,productQuery,setProductQuery, cart,setCart } = useContext(Context)
    const { id, token } = credentials

    useEffect(() => {
      debugger
          async function retrieve() {
            try {
              
              const cart = await logic.retrieveCart(id, token)    
              setCart(cart)           
              console.dir(cart)
            } catch(error) {
              console.log(error.message)
              debugger
            }
          }
          retrieve()   
    }, [cart])


  
  async function handleUpdateCart(id,token, productId) {
        try {
            await logic.updateCart(id,token, productId)           
            console.log("cart is updated")
        } catch(error) {
            console.log("error",error.message)
        }
    }

  function handleCheckout(event){
    event.preventDefault()
    handlePlaceOrder(id,token)
  }
  async function handlePlaceOrder(id,token){
    
    try{
      await logic.placeOrder(id,token)
      console.log("order is placed")
    }catch(error){
      console.log(error.message)
    }
  }


    return <>  
        <a href="/#/"><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>
        {console.log('hola mundo')}
        {console.dir(cart)}
        {cart &&        
            <div>
            <ul>
                 {cart.map(item=> {
                   return<>
                    <ul className='userCart'>
                    <li onClick={event=>{
                        event.preventDefault()
                        debugger
                        let productId=item._id               
                        handleUpdateCart( id,token,productId)
                    }}>><i class="far fa-times-circle"></i></li>
                    <li className="userCart-description">{'ProductId'+item.product._id}</li>
                    <li className="userCart-quantity">{'Quantity'+item.quantity}</li>
                    </ul>
                   </>
                 }
                  )} 
            </ul> 
            <button className="formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>
            </div>
    }       
    </>
}

export default UserCart