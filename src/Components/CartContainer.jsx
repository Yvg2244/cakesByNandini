import React, { useEffect, useState } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import CartItem from "./CartItem";

const CartContainer = () => {
    const [{cartShow,cartItems,user},dispatch]=useStateValue()
  const [tot,setTot]=useState(0)
  const [flag,setFlag]=useState(1)

    const showCart=()=>{
        dispatch({
            type:actionType.SET_CARTITEM,
            cartShow:!cartShow
        })
    }
    useEffect(()=>{
      let totalPrice=cartItems.reduce(function(accumaltor,item){
        return accumaltor+item.quantity*item.price
      },0)
      setTot(totalPrice)

    },[tot,flag])
  return (
    <div className="flex flex-col fixed top-0  h-screen right-0 w-375 bg-white ">
      <div  className="w-full flex justify-between cursor-pointer items-center">
        <p onClick={showCart}>back</p>
        <p>clear cart</p>
       
        {/* cartItem */}
        {cartItems && cartItems.map(item=>(<CartItem flag={flag} setFlag={setFlag} key={item.id} item={item}/>))}
        
      </div>
      {/* //carttotal */}
      <div>
        <div>
            <p>Sub total</p>
            <p>$ 10</p>
            <p>delivery</p>
            <p>1</p>
            <div>Total</div>
            <p>${tot}</p>
        </div>
      </div>
      {user?<div>
        CHECKOUT
      </div>:<div>Login</div>}
      
    </div>
  );
};

export default CartContainer;
