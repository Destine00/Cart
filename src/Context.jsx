import { useReducer, useContext, createContext, useEffect } from "react";
import cartItems from "./data";
import cartReducer from "./Reducer/Reducer";
import {
  INCREASE,
  DECREASE,
  REMOVE_ITEM,
  CLEAR_CART,
  LOADING,
  DISPLAY_ITEMS,
} from "./Reducer/Actions";
import GetTotal from "./GetTotal";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const GlobalCtx = createContext();
export const useAppCtx = () => useContext(GlobalCtx);

const defaultState = {
  cart: new Map(),
  loading: true,
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, defaultState);
  const { totalAmount, totalCost } = GetTotal(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const increment = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrement = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    try {
      dispatch({type: LOADING})
      const resp = await fetch(url);
      const data = await resp.json();
      dispatch({type: DISPLAY_ITEMS, payload: {data}})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalCtx.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increment,
        decrement,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </GlobalCtx.Provider>
  );
};

export default AppContext;
