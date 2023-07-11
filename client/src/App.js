import { Route, Routes } from "react-router-dom";
import './App.css';
import User from "./User/User";
import View from "./View/View";

function App() {
  return (
    <>
    <Routes>
      <Route path ="/:id" element = {<User/>}></Route>
      <Route path ="/" element = {<User/>}></Route>
      <Route path="/view" element = {<View/>}></Route>
    </Routes>
    </>
  );
}

export default App;
