import React from "react";
import { useState, useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
const CartItem = ({ item,flag,setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const [quantity, setQTy] = useState(item.quantity);
  const [items, setitems] = useState([]);

const cartDispatch=()=>{
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEM,
      cartItems: items,
    });
}
 

  const updateQty = (action, id) => {
    if (action == "add") {
      setQTy(quantity + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
          setFlag(flag+1)
        }
      });
      cartDispatch();
    }
    else{
        if(quantity==1){
            setitems(cartItems.filter((item)=>item.id!==id))
          setFlag(flag+1)

            cartDispatch()
        }
        else{setQTy(quantity-1)
            cartItems.map((item) => {
                if (item.id === id) {
                  item.quantity -= 1;
          setFlag(flag+1)

                }
              });
            cartDispatch()
        }
    }
  };
  useEffect(() => {
    setitems(cartItems)
  }, [items, quantity]);

  return (
    <div>
      <div key={item.id}>
        <div>
          <img src={item.imageURL} alt="imgae" />
          <p>{item.title}</p>

          <p>{item.price * quantity}</p>
        </div>

        <div
          onClick={() => {
            updateQty("add", item?.id);
          }}
        >
          +
        </div>
        <div>{quantity}</div>
        <div
          onClick={() => {
            updateQty("remove", item?.id);
          }}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default CartItem;
