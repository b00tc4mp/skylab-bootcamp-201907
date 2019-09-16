/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import { debuggerStatement } from '@babel/types'



function AuctionDetail() {

  const[counter,setCounter]=useState(1)
  const[success,setSuccess]=useState(false)

  let quantity=counter
  let price
  let auctionId
  
    const {  setView, view, product, setProduct,productQuery,user } = useContext(Context)
    const productId=productQuery


    useEffect(() => {
      (async () =>{
        try{
          const product=await logic.retrieveProduct(productQuery)    
          setProduct(product)
          setCounter(product.price)
        }catch(error){
          console.log(error.message)
        }
      })()       
    },[])

 function handleGoBack(event){
  event.preventDefault()
  setView("landing") 
  } 

  function handleSubmitAuction(event){
    event.preventDefault()
    console.log(productId)
    handleAuction(productId)
  }

  async function handleAuction(productId){
    try{
      
      const result=await logic.setAuction(productId)
      setSuccess(true)
      console.log("added to auction")
      
      auctionId=result
      price=parseInt(counter)
      await logic.updateAuction(auctionId,price)
      console.log('product UPDATED')
      debugger
      const response=await logic.retrieveAuction(auctionId)
      console.log('auction retrieved')

    }catch(error){
      console.log(error.message)
    }
  }
    

    return <>
     { product && user && <div>
                    <ul className='detail'>
                    <li className="detail-title">{product.title}</li>
                    <li className="detail-picture"><img src={product.image}/></li>
                    <li className="detail-price">{'Initial price: '+product.price+" €"}</li>
                    <li className="detail-description">{product.description}</li>
                    </ul> 
                    <div className="detail-add-cart-container">
                    <div className="detail-counter">         
                            <button className="detail-operator" onClick={event => {
                        event.preventDefault()  
                        setCounter(counter-1)
                        if(counter==product.price) setCounter(product.price)

                        
                    }}>-</button>
                <p className="detail-result">{counter+ " €"}</p>
                <button className="detail-operator" onClick={event => {
                        event.preventDefault()  
                        setCounter(counter+1)
                        
                    }}>+</button>
                    </div> 

                    <button className="formPanel-reject"><a  onClick={handleSubmitAuction}>Push Auction !</a></button>
                    </div>
                    <a onClick={handleGoBack}><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backFromDetail"></i></a>


                    </div> 
    }
    {success==true &&
      <div>
      <p>Product added to cart</p>
      </div>

    }
  
    </>
}

export default AuctionDetail