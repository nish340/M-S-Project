import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Forget from "./Components/Forget";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
