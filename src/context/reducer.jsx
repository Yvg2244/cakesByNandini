export const actionType = {
  SET_USER: "SET_USER",
  SET_ITEMS: "SET_ITEMS",
  SET_CARTSHOW: "SET_CARTSHOW",
  SET_CARTITEM: "SET_CARTITEM",
};
const reducer = (state, action) => {
  
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case actionType.SET_CARTSHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionType.SET_CARTITEM:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};
export default reducer;
