/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"



function Stock() {
    
    const { view, orders,setOrders} = useContext(Context)
    let tshirts=0
    let ducks=0
    let mugs=0


    useEffect(() => {     
          (async ()=> {
            try {
              const orderId = await logic.retrieveAllOrders()
              setOrders(orderId)           
              console.log('is order? '+orderId)
            } catch(error) {
              console.log(error.message)          
            }
          })()   
    }, [])


    return <>
    {view==="productDetail" && <Redirect to="/productDetail"/>}
    <h4>Pending Stock:</h4>
    {orders &&
    
        
            <ul>
                 {orders.map(item=> {
                   return<>
                    <ul className='orders' >
                    <label className="orders-label">ITEMS:</label>
                    <li className="">{item.items.map(prod=>"Product: "+prod.product.title+ " Description: "+prod.product.description + " Price: " + prod.product.price + "        Quantity: \n"+prod.quantity + "    ")}</li>
                    </ul>
                   </>
                   
                 }
                 
                  )} 
            </ul> 
            
            
    } 
    {orders &&
    orders.map(item=>{
        item.items.filter(prod=>{    
        if(prod.product.title==="t-shirt") tshirts+=parseInt(prod.quantity)
        if(prod.product.title==="duck") ducks+=parseInt(prod.quantity)
        if(prod.product.title==="mug") mugs+=parseInt(prod.quantity)

    })})} 
        <h3> Needed stock for thsirts: {tshirts}</h3>
        <h3> Needed stock for ducks: {ducks}</h3>
        <h3> Needed stock for mugs: {mugs}</h3>
        <a href='/#/admin' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>

    </>
}

export default Stock