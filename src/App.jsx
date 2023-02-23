import { Route, Routes } from "react-router-dom";
import CreateContainer from "./Components/CreateContainer";
import Header from "./Components/Header";
import MainContainer from "./Components/MainContainer";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { useEffect } from "react";
import { getAllItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
function App() {

  const [{items},dispatch]=useStateValue();
  const fetchData=async()=>{
    await getAllItems().then(data=>{
      dispatch({
        type:actionType.SET_ITEMS,
        items:data
      })
    })
  }
  useEffect(() => {
   fetchData()
  }, [])
  
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col">
        <Header></Header>
        <main className=" ">
        <Routes>
          <Route path="/*" element={<MainContainer></MainContainer>}></Route>
          <Route
            path="/createItem"
            element={<CreateContainer></CreateContainer>}
          ></Route>
        </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
