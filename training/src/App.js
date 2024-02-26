import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute";
import Forget from "./Components/Forget";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
