/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext , useEffect} from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"




function RemoveProducts() {
    
    const { setView , admin, view, price,products, setProductQuery, setProducts, css,setCss,productQuery } = useContext(Context)

    useEffect(() => {
        (async () =>{
          try{
            const products=await logic.retrieveAllProducts()
            
            setProducts(products)
          }catch(error){
            console.log(error.message)
          }
        })()
           
  },[view])

    let productId=""

    
    return <>
        <h2 className="formPanel">Select the product to remove</h2>
        {products &&
            <ul >
                 {products.map(item=> {
                   return<>
                    <ul onClick={event => {
                event.preventDefault()
                setProductQuery(item._id)
                setView("acceptToRemove")
            }} >
                  <li  className={css}>{'Title: '+item.title}</li>
                  <li  className={css}>{'Color: '+item.color}</li>
                  <li className={css} >{'Price: '+item.price+" €"}</li>
                  {productQuery===item._id
                && <a onClick={(event)=>{
                    event.preventDefault()
                setProductQuery(item._id)
                productId=item._id
                productId=item._id
                //handleRemove(productId)
                async function handleRemove(productId){
                    try{                     
                        await logic.removeProduct(productId)
                        console.log("product is removed")
                        setView("removed")
                    }catch(error){
                        console.log("error",error.message)
                    }
                }}}>Press to Delete</a>}
                  <hr></hr>
                    </ul>
                   </>
                 }
                 
                  )} 
            </ul> 
            
    }
        <a href='/#/admin'><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>      
    </>
}

export default RemoveProducts