import React from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { HiOutlineCake } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user,cartShow,cartItems},dispatch]=useStateValue()
  const showCart=()=>{
    console.log("sdf")
    dispatch({
      type:actionType.SET_CARTSHOW,
      cartShow:!cartShow
    })
  }
  const login = async () => {
    const {user:{refreshToken,providerData}} = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type:actionType.SET_USER,
      user:providerData[0]
    })  
    localStorage.setItem("user",JSON.stringify(providerData[0]))
  };
  return (
    <header className=" w-screen  z-50 p-1 px-15 md:p-2 md:px-20 bg-primary">
      <div className="relative hidden md:flex items-center justify-center w-full p-2 h-full">
        <div className="font-italian absolute text-4xl left-0 top-1">
          Cakes By Nandini
        </div>
        <div>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center justify-center gap-20  "
          >
            <li className="text-md text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-md text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li>
            <li className="text-md text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Order
            </li>
            <li className="text-md text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Gallery
            </li>
          </motion.ul>
        </div>
        <div onClick={showCart} className=" flex absolute right-7 m-6 px-5 items-center ">
          <HiOutlineCake className="text-xl ml-8 cursor-pointer" />
          {cartItems && cartItems.length>0&&( <div className="w-8 font-semibold h-10 rounded-full">
            <p className="text-sm">{cartItems.length}</p>
          </div>)}
        </div>
        <div className=" flex absolute right-5 m-6 px-2  items-center ">
          <CgProfile
            className="text-xl drop-shadow-xl ml-8 cursor-pointer"
            onClick={login}
          />
        </div>
      </div>
      {/* mobile  view */}
      <div className="flex md:hidden items-center justify-center w-full h-full">
        <div className="font-italian  text-3xl ">Cakes By Nandini</div>

        <div onClick={showCart} className=" flex absolute right-0  mx-2 items-center ">
          <HiOutlineCake className="text-md ml-8 cursor-pointer" />
          {cartItems && cartItems.length>0&&( <div className="w-8 font-semibold h-10 rounded-full">
            <p className="text-sm">{cartItems.length}</p>
          </div>)}
         
        </div>

        <div className=" flex absolute right-0 mx-2  items-center ">
          {user?(<img src={user.photoURL}  className="text-md rounded-full  max-w-[20px] aspect-square drop-shadow-xl ml-8 cursor-pointer"
            onClick={login}></img>):(<CgProfile
            className="text-md drop-shadow-xl ml-8 cursor-pointer"
            onClick={login}
          />)}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
