import React, { useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { useEffect } from 'react'
const RowContainer = ({flag,data}) => {
    const [{cartItems},dispatch] =useStateValue()
   const [items,setItems]=useState([])
    const addToCart=()=>{
      
        dispatch({
            type:actionType.SET_CARTITEM,
            cartItems:items
        })
        localStorage.setItem("cartItems",JSON.stringify(items))
    }
    useEffect(() => {
      addToCart()
    
    }, [items])
    
  return (
    <div className={`w-full my-12 ${flag}?'overflow-scroll:overflow-x-hidden`}>
        {data&&data.length>0?(data.map(item=>(
            <div key={item.id}className="min-w-350 h-auto backdrop-blur-lg">
            
            <div className="w-full flex items-center justify-center">
                <img src={item.imageURL} alt="" className='w-40' />
                <div onClick={()=>  setItems([...cartItems,item])} className="w-8 h-8 rounded bg-red-400 cursor-pointer">
                    <MdShoppingBasket/>
                </div>
            </div>
            <div className="w-full flex ">
                <p className="font-semibold">{item.title}</p>
                <p>{item.price}</p>
            </div>
        </div>
        ))):<div>Cart Empty</div>}
        
    </div>
  )
}

export default RowContainer