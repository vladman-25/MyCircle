import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Feed from './components/Feed/Feed';
import Navbar from "./components/Navbar/Navbar";
import Unauthorized from "./components/Unauthorized/Unauthorized";

import Auth from "./modules/Auth"

function App() {
  return (
      <BrowserRouter className="main-container">
          <Navbar/>
          <Routes>
              <Route path="/" exact element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/feed" element={<Feed />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
