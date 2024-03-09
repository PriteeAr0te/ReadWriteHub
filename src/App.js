import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BookState from "./Context/Books/BookState";
import VerifyEmail from "./Components/VerifyEmail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Author from "./Components/Author";
import Reader from "./Components/Reader";
import { useState } from "react";

function App() {
  const [userType, setUserType] = useState("");
  return (
    <>
      <BookState>
        <BrowserRouter>
          <Navbar userType={userType} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/author" element={<Author />} />
            <Route path="/reader" element={<Reader />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </BookState>
    </>
  );
}

export default App;
