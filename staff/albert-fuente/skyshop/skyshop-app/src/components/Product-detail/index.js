/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import { debuggerStatement } from '@babel/types'



function ProductDetail() {

  const[counter,setCounter]=useState(1)
  const[success,setSuccess]=useState(false)

  let quantity=counter
  
    const {  setView, view, product, setProduct,productQuery,setProductQuery } = useContext(Context)
    const productId=productQuery

    useEffect(() => {
      (async () =>{
        try{
          const product=await logic.retrieveProduct(productQuery)    
          setProduct(product)
        }catch(error){
          console.log(error.message)
        }
      })()       
    },[])

 function handleGoBack(event){
  event.preventDefault()
  setView("landing") 
  } 

  function handleAdd(event){
    event.preventDefault()
    handleAddCart(productId, quantity)
  }

  async function handleAddCart(productId,quantity){
    try{
      await logic.addToCart(productId,quantity)
      setSuccess(true)
      console.log("added to cart")

    }catch(error){
      console.log(error.message)
    }
  }
    

    return <>
  {view==="landing" && <Redirect to="/"/>}
    <a onClick={handleGoBack}><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backFromDetail"></i></a>
     { product && <div>
                    <hr></hr>
                    <ul className='detail'>
                    <li className="detail-picture"><img src={product.image}/></li>
                    <li className="detail-price">{product.price+" J"}</li>
                    <li className="detail-description">{product.description}</li>
                    </ul> 
                    <div className="detail-add-cart-container">
                    <div className="detail-counter">         
                            <button className="detail-operator" onClick={event => {
                        event.preventDefault()  
                        setCounter(counter+1)
                        
                    }}>+</button>
                <p className="detail-result">{counter}</p>
                <button className="detail-operator" onClick={event => {
                        event.preventDefault()  
                        setCounter(counter-1)
                        if(counter==1) setCounter(1)
                        
                    }}>-</button>
                    </div> 

                    <button className="addCart"><a className="addCart-a" onClick={handleAdd}>Add to Cart</a></button>
                    </div>
                    <hr></hr>

                    </div> 
    }
    {success==true &&
      <div>
      <p>Product added to cart</p>
      </div>

    }
  
    </>
}

export default ProductDetail