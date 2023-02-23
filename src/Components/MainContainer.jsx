import React, { useEffect } from "react";
import {MdChevronLeft,MdChevronRight} from "react-icons/md"
import HomeContainer from "./HomeContainer";
import RowContainer from "./RowContainer";
import {useStateValue} from "../context/StateProvider"
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{items,cartShow},dispatch]=useStateValue()
  useEffect(() => {
  }, [cartShow])
  
    return (
   <div className="w-full h-auto flex flex-col items-center">
   <HomeContainer></HomeContainer>
   <section className="w-full">
    <div className="w-full flex item center justify-between" >
      <p className="uppercase font-bold text-3xl">
        Our Products
      </p>
      <div className="item-center hidden md:flex gap-3" >
         <div className="w-8 h-8 bg-orange-600 cursor-pointer"><MdChevronLeft></MdChevronLeft></div>
         <div className="w-8 h-8 bg-orange-600"><MdChevronRight></MdChevronRight></div>
      </div>
    </div>
    <RowContainer flag={true} data={items?.filter(n=>n.category==="muffin")}/>
    </section>
    <MenuContainer/>
    {cartShow&&<CartContainer/>}
    
   </div>
  );
};

export default MainContainer;
