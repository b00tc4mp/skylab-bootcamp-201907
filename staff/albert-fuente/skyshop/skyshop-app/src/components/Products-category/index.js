/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext , useEffect} from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"


function ProductsCategory() {
    
    const {  setView, view, products, setProducts,productQuery,setProductQuery } = useContext(Context)

    useEffect(() => {
        (async () =>{
          try{
            const products=await logic.retrieveProductCategory(productQuery)           
            setProducts(products)
          }catch(error){
            console.log(error.message)
          }
        })()
           
  },[productQuery])
  

    return <>
    {view==="productDetail" && <Redirect to="/productDetail"/>}
    {products &&
            <ul>
                 {products.map(item=> {
                   return<>
                    <ul className='product'onClick={event => {
                event.preventDefault()
                setView("productDetail")
                setProductQuery(item._id)
            }} >
                    <li className="product-description">{item.description}</li>
                    <img src={item.image}/>
                    <li className="product-price">{item.price+" J"}</li>
                    </ul>
                   </>
                 }
                 
                  )} 
            </ul> 
    }     
    </>
}

export default ProductsCategory