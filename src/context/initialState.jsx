// import { fetchcart } from "../utils/fetchLocalStorageData";

// import { fetchUser } from "../utils/fetchLocalStorageData"
const cartInfo =
      localStorage.getItem("cartItems") !== "undefined"
        ? JSON.parse(localStorage.getItem("cartItems"))
        : localStorage.clear();
  

const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

export const initialState={
    user:userInfo,
    items:null,
    cartShow:false,
    cartItems:cartInfo?cartInfo:[]
}